#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
遍历目录下所有 yml/yaml 文件，
找出 material_type: skull_hash 且下一行 material: <hash> 的所有物品，
并按 hash 分组输出其 id。
"""

import sys
import os
from pathlib import Path
import yaml
from collections import defaultdict

def scan_yml_files(root_dir):
    """生成器：递归返回所有 .yml / .yaml 文件路径"""
    for p in Path(root_dir).rglob("*"):
        if p.suffix.lower() in {".yml", ".yaml"}:
            yield p

def parse_skull_hash_mapping(file_path):
    """
    解析单个 yaml 文件，返回 dict: {hash: [id1, id2, ...]}
    只提取满足条件的物品 id。
    """
    mapping = defaultdict(list)
    try:
        with file_path.open("r", encoding="utf-8") as f:
            data = yaml.safe_load(f)
            if not isinstance(data, dict):
                return mapping
    except Exception as e:
        print(f"[WARN] 无法解析 {file_path}: {e}", file=sys.stderr)
        return mapping

    for item_id, item_conf in data.items():
        if not isinstance(item_conf, dict):
            continue
        item_section = item_conf.get("item")
        if not isinstance(item_section, dict):
            continue
        # 必须同时存在且匹配
        if item_section.get("material_type") == "skull_hash" and "material" in item_section:
            hash_val = item_section["material"]
            if isinstance(hash_val, str) and hash_val.strip():
                mapping[hash_val.strip()].append(item_id)
    return mapping

def main():
    if len(sys.argv) < 2:
        print("用法: python find_same_skull.py <目录路径>")
        sys.exit(1)

    root = sys.argv[1]
    if not os.path.isdir(root):
        print(f"错误: {root} 不是有效目录")
        sys.exit(1)

    grand_mapping = defaultdict(list)  # hash -> [id, ...]

    for yml_path in scan_yml_files(root):
        partial = parse_skull_hash_mapping(yml_path)
        for h, ids in partial.items():
            grand_mapping[h].extend(ids)

    # 过滤掉只出现一次的 hash
    duplicates = {h: ids for h, ids in grand_mapping.items() if len(ids) > 1}

    if not duplicates:
        print("未找到 material_type: skull_hash 且 hash 重复的物品。")
        return

    # 按 hash 排序输出
    for h in sorted(duplicates.keys()):
        print(f"Hash: {h}")
        for item_id in duplicates[h]:
            print(f"  - {item_id}")
        print()

if __name__ == "__main__":
    main()