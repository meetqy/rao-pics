---
name: 提交 Bug
about: 请按照模板填写，帮助我快速定位 Bug
title: "[Bug]: xxx"
labels: ["bug"]
assignees: meetqy
body:
  - type: input
    attributes:
      label: 请填写问题描述

  - type: checkboxes
    attributes:
      label: 请选择你的操作系统
      description: 请勾选你的操作系统
    options:
      - label: Windows
      - label: macOS
      - label: Linux
    validations:
      required: true

  - type: input
    attributes:
      label: 请填写你使用的软件版本
    required: true

  - type: markdown
    attributes:
      label: 请填写复现步骤
      value: |
        1. xxx
        2. xxx
        3. xxx
    required: true
---
