#!/usr/bin/env python3
import argparse
import json
import os
import re
import shutil
import sys
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

# Optional imports for live scraping
try:
    import requests  # type: ignore
    from bs4 import BeautifulSoup  # type: ignore
except Exception:
    requests = None  # type: ignore
    BeautifulSoup = None  # type: ignore


def create_backup(file_path: str) -> str:
    backup_path = f"{file_path}.backup.{int(datetime.now().timestamp())}"
    shutil.copyfile(file_path, backup_path)
    print(f"📁 Created backup: {os.path.basename(backup_path)}")
    return backup_path


def generate_fixtures_code(new_fixtures: list[dict]) -> str:
    if not new_fixtures:
        return ''
    parts = []
    for f in new_fixtures:
        parts.append(
            "  {\n"
            f"    id: \"{f.get('id','')}\",\n"
            f"    season: \"{f.get('season','')}\",\n"
            f"    homeTeam: \"{f.get('homeTeam','')}\",\n"
            f"    awayTeam: \"{f.get('awayTeam','')}\",\n"
            f"    date: \"{f.get('date','')}\",\n"
            f"    time: \"{f.get('time','')}\",\n"
            f"    venue: \"{f.get('venue','')}\",\n"
            f"    competition: \"{f.get('competition','')}\",\n"
            f"    isTournament: {str(f.get('isTournament', False)).lower()},\n"
            f"    status: \"{f.get('status','')}\",\n"
            f"    result: \"{f.get('result','')}\",\n"
            f"    score: \"{f.get('score','')}\",\n"
            f"    notes: \"{f.get('notes','')}\",\n"
            f"    venueKey: \"{f.get('venueKey','')}\"\n"
            "  }"
        )
    return ",\n".join(parts)


def update_fixtures_data_file(root_dir: str, new_fixtures: list[dict]) -> None:
    if not new_fixtures:
        print('No new fixtures to add to fixturesData.ts')
        return

    fixtures_data_path = os.path.join(
        root_dir, 'src', 'data', 'fixturesData.ts')
    if not os.path.exists(fixtures_data_path):
        print(f"❌ File not found: {fixtures_data_path}")
        sys.exit(1)

    create_backup(fixtures_data_path)
    with open(fixtures_data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove duplicates from upcomingLeagueMatches2025_26 by id
    try:
        ids_to_remove = [f.get('id', '') for f in new_fixtures if f.get('id')]
        if ids_to_remove:
            content = remove_upcoming_duplicates_by_id(content, ids_to_remove)
    except Exception as e:
        print(
            f"⚠️ Could not remove duplicates from upcomingLeagueMatches2025_26: {e}")

    fixtures_code = generate_fixtures_code(new_fixtures)
    if not fixtures_code:
        print('No new fixtures to add to fixturesData.ts')
        return

    # Insert before upcoming tournaments header, avoiding a double comma
    completed_end_pattern = re.compile(
        r"(\s*\]\s*;\s*\n\s*\n\s*// 2025-2026 Season Upcoming Tournaments)")
    array_end_pattern = re.compile(
        r"(\s*\]\s*;\s*\n\s*// 2025-2026 Season Upcoming Tournaments)")

    def insert_fixtures_at(match: re.Match[str]) -> str:
        start = match.start(1)
        # look back to find last non-whitespace char before start
        before = content[:start]
        i = len(before) - 1
        while i >= 0 and before[i].isspace():
            i -= 1
        needs_comma = True
        if i >= 0 and before[i] in ['[', ',']:
            # if previous char is '[' (start of array) we don't need a comma
            # if it's already a comma, we also don't add another
            needs_comma = before[i] != ','
        prefix = (",\n" if needs_comma else "\n")
        insertion = f"{prefix}  // New fixtures from LMS update\n{fixtures_code}\n"
        return content[:start] + insertion + content[start:]

    m = completed_end_pattern.search(
        content) or array_end_pattern.search(content)
    if m:
        content = insert_fixtures_at(m)
    else:
        print('Could not find the correct location to add new fixtures')
        print('Looking for pattern: "] ; // 2025-2026 Season Upcoming Tournaments"')
        return

    with open(fixtures_data_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ Updated fixturesData.ts with {len(new_fixtures)} new fixtures")


def generate_board_results_code(new_board_results: dict) -> str:
    if not new_board_results:
        return ''
    entries = []
    for fixture_id, data in new_board_results.items():
        boards = data.get('boardResults', []) or []
        board_parts = []
        for b in boards:
            def to_int_or_zero(val):
                try:
                    return int(val) if val is not None else 0
                except Exception:
                    return 0
            board_parts.append(
                "      {\n"
                f"        board: {int(b.get('board', 0))},\n"
                f"        homePlayer: \"{b.get('homePlayer','')}\",\n"
                f"        awayPlayer: \"{b.get('awayPlayer','')}\",\n"
                f"        homeRating: {to_int_or_zero(b.get('homeRating', 0))},\n"
                f"        awayRating: {to_int_or_zero(b.get('awayRating', 0))},\n"
                f"        result: \"{b.get('result','')}\",\n"
                f"        gameLength: \"{b.get('gameLength','')}\",\n"
                f"        opening: \"{b.get('opening','')}\",\n"
                f"        notes: \"{b.get('notes','')}\"\n"
                "      }"
            )
        boards_code = ",\n".join(board_parts)
        entries.append(
            f"  \"{fixture_id}\": {{\n"
            f"    \"boardResults\": [\n{boards_code}\n"
            f"    ]\n"
            f"  }}"
        )
    return "\n".join(entries)


def update_fixtures_file(root_dir: str, new_board_results: dict) -> None:
    if not new_board_results:
        print('No new board results to add to fixtures.ts')
        return

    fixtures_path = os.path.join(root_dir, 'src', 'data', 'fixtures.ts')
    if not os.path.exists(fixtures_path):
        print(f"❌ File not found: {fixtures_path}")
        sys.exit(1)

    create_backup(fixtures_path)
    with open(fixtures_path, 'r', encoding='utf-8') as f:
        content = f.read()

    results_code = generate_board_results_code(new_board_results)
    if not results_code:
        print('No board results entries generated; skipping fixtures.ts update')
        return

    end_pattern = re.compile(
        r"(\s*\};\s*// Function to determine fixture status)")
    fallback_pattern = re.compile(r"(\s*\};\s*const getFixtureStatus)")

    def insert_results_at(match: re.Match[str]) -> str:
        start = match.start(1)
        before = content[:start]
        i = len(before) - 1
        while i >= 0 and before[i].isspace():
            i -= 1
        # Avoid adding an extra comma if one already exists before insertion
        needs_comma = True
        if i >= 0 and before[i] in ['{', ',']:
            needs_comma = before[i] != ','
        prefix = (",\n" if needs_comma else "\n")
        insertion = f"{prefix}  // New board results from LMS update\n{results_code}\n"
        return content[:start] + insertion + content[start:]

    m2 = end_pattern.search(content) or fallback_pattern.search(content)
    if m2:
        content = insert_results_at(m2)
    else:
        print('❌ Could not find insertion point for board results')
        sys.exit(1)

    with open(fixtures_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(
        f"✅ Updated fixtures.ts with board results for {len(new_board_results.keys())} fixtures")


def remove_upcoming_duplicates_by_id(content: str, ids: List[str]) -> str:
    marker = 'export const upcomingLeagueMatches2025_26: SimpleFixture[] ='
    start_idx = content.find(marker)
    if start_idx == -1:
        return content
    bracket_start = content.find('[', start_idx)
    if bracket_start == -1:
        return content
    # Find matching closing bracket for this array by tracking nested [] depth
    depth = 0
    i = bracket_start
    end_idx = -1
    while i < len(content):
        ch = content[i]
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
            if depth == 0:
                end_idx = i
                break
        i += 1
    if end_idx == -1:
        return content
    # Include following semicolon if present
    after_end = end_idx + 1
    if after_end < len(content) and content[after_end] == ';':
        close_slice = after_end + 1
    else:
        close_slice = end_idx + 1

    array_body = content[bracket_start + 1: end_idx]

    # Indentation preservation
    indent_match = re.search(r"\n([ \t]*)\{", array_body)
    indent = ('\n' + indent_match.group(1)) if indent_match else '\n  '

    # Parse top-level objects by brace depth only (ignore commas/newlines)
    objs: List[str] = []
    j = 0
    n = len(array_body)
    while j < n:
        # skip whitespace and commas
        while j < n and array_body[j] in [' ', '\t', '\n', '\r', ',']:
            j += 1
        if j >= n:
            break
        if array_body[j] != '{':
            j += 1
            continue
        bdepth = 0
        start_obj = j
        while j < n:
            if array_body[j] == '{':
                bdepth += 1
            elif array_body[j] == '}':
                bdepth -= 1
                if bdepth == 0:
                    j += 1
                    break
            j += 1
        objs.append(array_body[start_obj:j])
        while j < n and array_body[j] in [' ', '\t', '\n', '\r', ',']:
            j += 1

    # Keep objects whose id does NOT match any in ids
    keep: List[str] = []
    for obj in objs:
        if any(re.search(rf"id:\s*\"{re.escape(fid)}\"", obj) for fid in ids):
            continue
        keep.append(obj)

    # Rebuild array body safely
    if keep:
        new_body = ''.join(
            f"{indent}{obj}{',' if idx < len(keep) - 1 else ''}" for idx, obj in enumerate(keep)
        ) + '\n'
    else:
        new_body = '\n'

    return content[:bracket_start + 1] + new_body + content[close_slice:]


def normalize_team_name(name: str) -> str:
    return re.sub(r"\s+", " ", name.strip()).lower()


def parse_lms_date(date_str: str) -> str:
    if not date_str.strip():
        return ''
    parts = date_str.strip().split()
    if len(parts) < 3:
        return ''
    # e.g. Tue 23 Sep 25
    day = parts[1].zfill(2)
    month = parts[2]
    year = parts[3] if len(parts) > 3 else '25'
    month_map = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
        'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    }
    month_num = month_map.get(month, '01')
    full_year = f"20{year}" if len(year) == 2 else year
    return f"{full_year}-{month_num}-{day}"


def parse_lms_time(time_str: str) -> str:
    if not time_str.strip():
        return '19:30'
    m = re.search(r"(\d{1,2}:\d{2})", time_str)
    return m.group(1) if m else '19:30'


def has_result(result: str) -> bool:
    r = result.strip()
    return r != '' and r not in ('0-0', '0 - 0')


def fetch_andover_fixtures() -> List[Dict[str, Any]]:
    if requests is None or BeautifulSoup is None:
        print('❌ Live scraping requires requests and beautifulsoup4. Install with: pip install requests beautifulsoup4')
        sys.exit(1)
    ANDOVER_CLUB_URL = 'https://lms.englishchess.org.uk/lms/organisation/416'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    print('Fetching Andover Club fixtures from LMS...')
    resp = requests.get(ANDOVER_CLUB_URL, headers=headers, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')
    fixtures: List[Dict[str, Any]] = []
    for row in soup.select('table tr'):
        cells = row.find_all('td')
        if len(cells) >= 8:
            home_team = cells[0].get_text(strip=True)
            result = cells[1].get_text(strip=True)
            away_team = cells[2].get_text(strip=True)
            date = cells[3].get_text(strip=True)
            time = cells[4].get_text(strip=True)
            event = cells[5].get_text(strip=True)
            organisation = cells[6].get_text(strip=True)
            status = cells[7].get_text(strip=True)
            link_tag = cells[1].select_one('a')
            href = link_tag['href'] if link_tag and link_tag.has_attr(
                'href') else None
            fixture_url = f"https://lms.englishchess.org.uk{href}" if href else None
            if 'andover' in home_team.lower() or 'andover' in away_team.lower():
                fixtures.append({
                    'homeTeam': home_team,
                    'awayTeam': away_team,
                    'date': parse_lms_date(date),
                    'time': parse_lms_time(time),
                    'result': result,
                    'event': event,
                    'organisation': organisation,
                    'status': status,
                    'fixtureUrl': fixture_url,
                })
    print(f"Found {len(fixtures)} Andover fixtures")
    return fixtures


def fetch_match_details(fixture_url: str) -> Optional[Dict[str, Any]]:
    if not fixture_url:
        return None
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    print(f"Fetching match details from: {fixture_url}")
    try:
        resp = requests.get(fixture_url, headers=headers, timeout=30)
        resp.raise_for_status()
    except Exception as e:
        print(f"Error fetching match details from {fixture_url}: {e}")
        return None
    soup = BeautifulSoup(resp.text, 'html.parser')

    def parse_player_name(text: str) -> str:
        name = ' '.join((text or '').split()).strip()
        # Remove any trailing single capital letter
        name = re.sub(r"[A-Z]$", "", name).strip()
        # Remove extraneous commas/spaces
        name = name.replace(' ,', ',').strip().strip(',')
        # If name ends with a lone initial like ' J' keep the comma form '..., J'
        return name

    def parse_rating(text: str) -> Optional[int]:
        s = ' '.join((text or '').split())
        # Match number either bare or in parentheses, prefer last 3-4 digit group
        m = re.findall(r"\(?([0-9]{3,4})\)?", s)
        if m:
            try:
                return int(m[-1])
            except Exception:
                return None
        return None

    board_results: List[Dict[str, Any]] = []
    for row in soup.select('table tr'):
        cells = row.find_all('td')
        # Expect at least 6 columns: board, homeRating, homeName, result, awayName, awayRating
        if len(cells) < 4:
            continue
        board_text = cells[0].get_text(strip=True)
        # Skip header rows (no numeric board number)
        bm = re.search(r"(\d+)", board_text)
        if not bm:
            continue
        board = int(bm.group(1))

        # Fallback-safe extraction
        home_rating_text = cells[1].get_text(
            strip=True) if len(cells) > 1 else ''
        home_name_text = cells[2].get_text(
            strip=True) if len(cells) > 2 else ''
        result_text = cells[3].get_text(strip=True) if len(cells) > 3 else ''
        away_name_text = cells[4].get_text(
            strip=True) if len(cells) > 4 else ''
        away_rating_text = cells[5].get_text(
            strip=True) if len(cells) > 5 else ''

        home_rating = parse_rating(home_rating_text)
        away_rating = parse_rating(away_rating_text)
        home_name = parse_player_name(home_name_text)
        away_name = parse_player_name(away_name_text)
        # Remove leading membership level letter from away player's name (e.g., "G Jones" => "Jones")
        away_name = re.sub(r"^[A-Z]\s*", "", away_name).strip()

        # Work out result from column 4
        parsed = 'pending'
        if re.search(r"\b1\s*[-–]\s*0\b", result_text):
            parsed = '1-0'
        elif re.search(r"\b0\s*[-–]\s*1\b", result_text):
            parsed = '0-1'
        elif '½' in result_text or '1/2' in result_text:
            parsed = '½-½'

        board_results.append({
            'board': board,
            'homePlayer': home_name,
            'awayPlayer': away_name,
            'homeRating': home_rating,
            'awayRating': away_rating,
            'result': parsed,
        })
    # Simple notes scan
    match_notes = ''
    for el in soup.select('p, div'):
        text = el.get_text(strip=True)
        if len(text) > 50 and ('match' in text.lower() or 'game' in text.lower()):
            match_notes = text
            break
    return {
        'fixtureUrl': fixture_url,
        'boardResults': board_results,
        'matchNotes': match_notes or None,
    }


def scrape_andover_fixtures() -> List[Dict[str, Any]]:
    fixtures = fetch_andover_fixtures()
    scraped: List[Dict[str, Any]] = []
    for f in fixtures:
        entry: Dict[str, Any] = {'fixture': f}
        if has_result(f.get('result', '')) and f.get('fixtureUrl'):
            details = fetch_match_details(f['fixtureUrl'])
            if details:
                entry['matchDetails'] = details
        scraped.append(entry)
    return scraped


def read_existing_fixtures(fixtures_data_path: str) -> List[Dict[str, Any]]:
    with open(fixtures_data_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # Roughly capture object literals
    obj_pattern = re.compile(r"\{[\s\S]*?\}", re.MULTILINE)
    entries: List[Dict[str, Any]] = []
    for m in obj_pattern.finditer(content):
        block = m.group(0)
        # Only consider blocks that look like a fixture (must have homeTeam/awayTeam/date)
        if 'homeTeam' in block and 'awayTeam' in block and 'date' in block:
            def extract(field: str) -> Optional[str]:
                sm = re.search(rf"{field}:\s*\"([^\"]*)\"", block)
                return sm.group(1) if sm else None
            home = extract('homeTeam') or ''
            away = extract('awayTeam') or ''
            date = extract('date') or ''
            status = extract('status') or ''
            result = extract('result') or ''
            if home and away and date:
                entries.append({
                    'homeTeam': home,
                    'awayTeam': away,
                    'date': date,
                    'status': status,
                    'result': result,
                })
    return entries


def find_new_results(scraped_data: List[Dict[str, Any]], existing: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    new_results: List[Dict[str, Any]] = []
    for s in scraped_data:
        fixture = s['fixture']
        if not has_result(fixture.get('result', '')):
            continue
        scraped_home = normalize_team_name(fixture['homeTeam'])
        scraped_away = normalize_team_name(fixture['awayTeam'])
        date = fixture['date']
        match = next((e for e in existing if (
            (normalize_team_name(e['homeTeam']) == scraped_home and normalize_team_name(e['awayTeam']) == scraped_away and e['date'] == date) or
            (normalize_team_name(e['homeTeam']) == scraped_away and normalize_team_name(
                e['awayTeam']) == scraped_home and e['date'] == date)
        )), None)
        if not match or not (match.get('result') or '').strip():
            new_results.append(s)
    return new_results


def build_python_update_payload(root_dir: str) -> Dict[str, Any]:
    scraped = scrape_andover_fixtures()
    fixtures_data_path = os.path.join(
        root_dir, 'src', 'data', 'fixturesData.ts')
    existing = read_existing_fixtures(fixtures_data_path)
    new_results = find_new_results(scraped, existing)
    # Transform to SimpleFixture and boardResults shapes used by the updater
    new_fixtures: List[Dict[str, Any]] = []
    new_board_results: Dict[str, Dict[str, Any]] = {}

    def normalize_score_text(raw: str) -> str:
        s = (raw or '').strip()
        # Replace various dashes with '-'
        s = re.sub(r"[–—]", '-', s)
        # Remove spaces around hyphen, keep unicode half
        s = re.sub(r"\s*-\s*", '-', s)
        # Collapse multiple spaces
        s = re.sub(r"\s+", ' ', s).strip()
        return s

    def score_to_numbers(score: str) -> Optional[tuple[float, float]]:
        if not score:
            return None
        parts = score.split('-')
        if len(parts) != 2:
            return None

        def to_num(p: str) -> Optional[float]:
            p = p.strip()
            # handle unicode half
            p = p.replace('½', '.5')
            try:
                return float(p)
            except Exception:
                return None
        h = to_num(parts[0])
        a = to_num(parts[1])
        if h is None or a is None:
            return None
        return (h, a)

    def extract_team_letter(team_name: str) -> Optional[str]:
        m = re.search(r"andover\s+([A-Z])\b", team_name, re.IGNORECASE)
        if m:
            return m.group(1).lower()
        return None

    def to_simple_id(home: str, away: str, date: str) -> str:
        # Standard: andover-<team-letter>-YYYY-MM-DD
        letter: Optional[str] = None
        if 'andover' in home.lower():
            letter = extract_team_letter(home)
        if not letter and 'andover' in away.lower():
            letter = extract_team_letter(away)
        if not letter:
            letter = 'a'
        return f"andover-{letter}-{date}"
    for s in new_results:
        f = s['fixture']
        home = f['homeTeam']
        away = f['awayTeam']
        date = f['date']
        venue = 'home' if 'andover' in home.lower() else 'away'
        # Derive score and result (Win/Loss/Draw) from scraped result text
        raw_score = f.get('result') or ''
        score_str = normalize_score_text(raw_score)
        outcome = ''
        nums = score_to_numbers(score_str)
        if nums:
            home_score, away_score = nums
            if abs(home_score - away_score) < 1e-6:
                outcome = 'Draw'
            else:
                andover_won = (home_score > away_score) if venue == 'home' else (
                    away_score > home_score)
                outcome = 'Win' if andover_won else 'Loss'

        simple_fixture = {
            'id': to_simple_id(home, away, date),
            'season': f"{date.split('-')[0]}-{int(date.split('-')[0])+1}",
            'homeTeam': home,
            'awayTeam': away,
            'date': date,
            'time': f['time'] or '19:30',
            'venue': venue,
            'competition': f.get('event') or 'Southampton Chess League',
            'isTournament': False,
            'status': 'completed',
            'result': outcome or '',
            'score': score_str or '',
            'notes': (f"{home} vs {away} - Andover" if venue == 'home' else f"{home} vs {away} - {away.split()[0]}")
        }
        new_fixtures.append(simple_fixture)
        if s.get('matchDetails') and s['matchDetails'].get('boardResults'):
            new_board_results[simple_fixture['id']] = {
                'boardResults': s['matchDetails']['boardResults']
            }
    summary = {
        'totalScraped': len(scraped),
        'newResults': len(new_results),
        'fixturesWithDetails': len(new_board_results.keys())
    }
    return {
        'summary': summary,
        'newFixtures': new_fixtures,
        'newBoardResults': new_board_results,
    }


def main() -> None:
    parser = argparse.ArgumentParser(
        description='Update fixtures files from LMS JSON output')
    parser.add_argument('--input', '-i', required=False,
                        help='Path to JSON file containing newFixtures and newBoardResults')
    parser.add_argument('--root', '-r', default='.',
                        help='Project root directory (default: current directory)')
    parser.add_argument('--live', action='store_true',
                        help='Scrape LMS directly (Python-only, no Node)')
    args = parser.parse_args()

    root_dir = os.path.abspath(args.root)
    data: Dict[str, Any]
    if args.live or not args.input:
        print('🚀 Scraping LMS directly (Python) ...')
        data = build_python_update_payload(root_dir)
    else:
        json_path = os.path.abspath(args.input)
        if not os.path.exists(json_path):
            print(f"❌ Input JSON not found: {json_path}")
            sys.exit(1)
        with open(json_path, 'r', encoding='utf-8') as f:
            raw = f.read()
            if not raw.strip():
                print('❌ Input JSON file is empty. Aborting.')
                sys.exit(1)
            data = json.loads(raw)

    new_fixtures = data.get('newFixtures', [])
    new_board_results = data.get('newBoardResults', {})
    summary = data.get('summary', {})

    print('🚀 Starting LMS fixtures update...\n')
    if summary:
        print('=== UPDATE SUMMARY ===')
        print(f"Total fixtures scraped: {summary.get('totalScraped','?')}")
        print(f"New results found: {summary.get('newResults','?')}")
        print(
            f"Fixtures with board details: {summary.get('fixturesWithDetails','?')}")

    if new_fixtures:
        print('\n=== NEW FIXTURES ===')
        for fxt in new_fixtures:
            date = fxt.get('date', '')
            home = fxt.get('homeTeam', '')
            away = fxt.get('awayTeam', '')
            result = fxt.get('result') or 'No result'
            print(f"- {date}: {home} vs {away} ({result})")
        update_fixtures_data_file(root_dir, new_fixtures)

    if new_board_results:
        print('\n=== NEW BOARD RESULTS ===')
        for fixture_id, d in new_board_results.items():
            br = d.get('boardResults', []) or []
            print(f"- {fixture_id}: {len(br)} board results")
        update_fixtures_file(root_dir, new_board_results)

    if not new_fixtures and not new_board_results:
        print('\n✅ No new results found. All fixtures are up to date!')
    else:
        print('\n✅ Files updated successfully!')
        print('💡 Backup files have been created in case you need to revert changes.')


if __name__ == '__main__':
    main()
