import json

# Read the N3 kanji file
with open(r'd:\học tiếng nhật\public\data\kanji\n3.json', encoding='utf-8') as f:
    data = json.load(f)

print(f'Total N3 Kanji: {len(data)}')
print('\nFirst 20 kanji:')
for i, k in enumerate(data[:20]):
    print(f'{i+1}. {k["kanji"]} - {k["meaning_vi"]}')

print(f'\n... and {len(data) - 20} more kanji')
