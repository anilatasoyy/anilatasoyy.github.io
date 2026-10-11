---
title: "orderbook-engine"
description: "A single-threaded matching engine in C++17 implementing price-time priority for bids and asks. The interesting part is the documented optimization arc — seven iterations from a naive std::map baseline down to ~51 ns median latency using occupancy bitsets and hardware bit-scan instructions."
tags: ["C++17", "matching engine", "low-latency", "bitset", "profiling"]
github: "https://github.com/anilatasoyy/orderbook"
featured: true
order: 1
---

Integer tick prices avoid floating-point comparisons on the hot path entirely.

The project deliberately starts slow — a flat array with linear scan was introduced to expose and measure bottlenecks before optimizing, rather than guessing. Each iteration is documented with benchmark numbers.

Key optimizations applied:
- Head-index cursors replace vector erasure on the active price level
- Per-level pre-reserved capacity eliminates reallocation
- Occupancy bitset + hardware bit-scan (`BSF`) for finding the best price level — 41× tail-latency improvement
- Final result: ~51 ns median on server hardware, ~107 ns under WSL2

Intentionally excludes cancellation, multi-instrument, and threading to keep the matching hot path isolated and measurable.
