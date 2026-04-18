import json
import os

def analyze_grammar():
    base_path = r"d:\học tiếng nhật\public\data\grammar"
    levels = ["n5", "n4", "n3", "n2", "n1"]
    
    # Standard estimates for JLPT grammar points
    jlpt_standards = {
        "n5": {"target": 60, "desc": "Cơ bản (Sơ cấp 1)"},
        "n4": {"target": 100, "desc": "Cơ bản (Sơ cấp 2)"},
        "n3": {"target": 150, "desc": "Trung cấp"},
        "n2": {"target": 200, "desc": "Trung cao cấp"},
        "n1": {"target": 250, "desc": "Cao cấp"}
    }
    
    print("-" * 60)
    print(f"{'Cấp độ':<10} | {'Hiện có':<10} | {'Mục tiêu':<10} | {'Tiến độ':<10}")
    print("-" * 60)
    
    total_current = 0
    total_target = 0
    
    for level in levels:
        file_path = os.path.join(base_path, f"{level}.json")
        count = 0
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                count = len(data)
        
        target = jlpt_standards[level]["target"]
        progress = (count / target) * 100
        
        print(f"{level.upper():<10} | {count:<10} | {target:<10} | {progress:>6.1f}%")
        
        total_current += count
        total_target += target

    print("-" * 60)
    print(f"{'TỔNG':<10} | {total_current:<10} | {total_target:<10} | {(total_current/total_target)*100:>6.1f}%")
    print("-" * 60)

if __name__ == "__main__":
    analyze_grammar()
