---
name: Yonghao Tan
header:
  - text: Ph.D. Candidate in Electronic and Computer Engineering, The Hong Kong University of Science and Technology (HKUST)
  - text: HKUST, Clear Water Bay, Hong Kong, China
    newLine: true
  - text: +852 53946864
    link: tel:+85253946864
  - text: ytanaz@connect.ust.hk
    link: mailto:ytanaz@connect.ust.hk
  - text: yonghaot1017@gmail.com
    link: mailto:yonghaot1017@gmail.com
    newLine: true
  - text: yonghao-tan.github.io
    link: https://yonghao-tan.github.io/
  - text: ORCID 0000-0001-5372-5863
    link: https://orcid.org/0000-0001-5372-5863
---

## Education

**Ph.D. in Electronic and Computer Engineering**
  : **Sept. 2023 - Present**

The Hong Kong University of Science and Technology (HKUST)
  : Hong Kong, China

Supervisor: Prof. Tim Kwang-Ting Cheng

**B.E. in Microelectronics**
  : **Sept. 2019 - Jun. 2023**

Southern University of Science and Technology (SUSTech)
  : Shenzhen, Guangdong, China

Supervisor: Prof. Fengwei An

## Research Experience

**5nm UCIe-Enabled Multi-Chiplet Generalizable Rendering Processor**
  : *AI Chip Center for Emerging Smart Systems (ACCESS), Hong Kong, China*
  : **Mar. 2024 - Sept. 2025**

- Designed the architecture and execution scheduler for a 5nm four-chiplet GeNeRF processor, and built an early-stage simulation framework to evaluate buffer management, cross-die source-view caching, dense/sparse D2D transfer, multi-level sparsity control, and hybrid GeNeRF-SR dataflow.
- Developed algorithm-hardware co-design simulation models for projection-area-driven source-view placement, dynamic patch grouping, dense/sparse D2D modes, source-view pruning, tile-level fine-stage sharing, and patch-grained SR routing; used them to validate accuracy-sensitive sparsity and SR decisions and guide hardware-aware end-to-end quantization for silicon deployment.
- Contributed to the implementation of inter-chiplet transfer, chip-level control, and nonlinear computation modules; participated in chip testing and system validation of the fabricated 5nm MCM processor, which integrates the four-chiplet GeNeRF engine in a 45 mm x 45 mm package and achieves 91.43 TOPS/W and 55.43 FPS throughput.

**55nm ReRAM-on-Logic Stacked LLM Accelerator**
  : *AI Chip Center for Emerging Smart Systems (ACCESS), Hong Kong, China*
  : **Apr. 2024 - Aug. 2025**

- Contributed to algorithm-hardware co-design optimizations for a 55nm ReRAM-on-logic stacked edge LLM accelerator, targeting decoding-stage memory and scheduling bottlenecks with local-rotation-based W4A8 quantization, ReRAM-resident block-clustered codebook reconstruction, and adaptive speculative decoding.
- Implemented and validated the end-to-end algorithm flow, including layer-wise quantized LLM evaluation, codebook-based draft-model weight reconstruction, acceptance/rejection-aware speculative decoding analysis, and hardware-mapping studies that balance target-model EMA reduction against rejected-draft overhead.
- Designed RTL for nonlinear computation modules and related control/datapath logic; assisted chip testing and validation of the 55nm logic die stacked with four ReRAM dies via face-to-face bumps, achieving 14.08 to 135.69 token/s on a 55.98 mm² logic die.

**28nm CNN-Transformer Accelerator for Semantic Segmentation**
  : *AI Chip Center for Emerging Smart Systems (ACCESS), Hong Kong, China*
  : **Nov. 2021 - Sept. 2024**

- Contributed to the development of algorithm-hardware co-design optimizations for a 28nm CNN-Transformer semantic-segmentation accelerator, including hybrid attention processing, data-reuse-oriented layer fusion, and cascaded feature-map pruning for high-resolution ConvFormer workloads.
- Built a hardware energy simulation framework to quantify optimization impact and guide architecture and tape-out decisions; implemented the algorithm validation flow for VA/LA hybrid attention, KV/weight reuse scheduling, non-overlap layer fusion, and mask-based cascaded pruning.
- Designed RTL for attention/layer-fusion control and pruning-related datapath logic; assisted silicon testing and validation of the 13.93 mm² 28nm chip, achieving 0.22 uJ/token and up to 52.90 TOPS/W peak efficiency.

## Publications

**A 5nm 91.43 TOPS/W 4-Chiplet Generalizable-Rendering-Processor with UCIe-Enabled Cross-Die-Cache and Balance-Aware Progressive Multi-Level Sparsity**
  : <u>Tan, Y.</u>\*, Ma, S.\*, Dong, P., Luo, P., Lei, Z., Lu, W., Ying, G., ... &amp; Cheng, K. T.
  : *2026 IEEE Custom Integrated Circuits Conference (CICC), IEEE.*

**A 14.08-to-135.69Token/s ReRAM-on-Logic Stacked Outlier-Free Large-Language-Model Accelerator with Block-Clustered Weight-Compression and Adaptive Parallel-Speculative-Decoding**
  : Dong, P., <u>Tan, Y.</u>, Liu, X., Luo, P., Liu, Y., Pang, D., Ma, S., ... &amp; Cheng, K. T.
  : *2026 IEEE International Solid-State Circuits Conference (ISSCC), IEEE.*

**A 28nm 0.22uJ/Token Memory-Compute-Intensity-Aware CNN-Transformer Accelerator with Hybrid-Attention-Based Layer-Fusion and Cascaded Pruning for Semantic-Segmentation**
  : Dong, P.\*, <u>Tan, Y.</u>\*, Liu, X., Luo, P., Liu, Y., Liang, L., ... &amp; Cheng, K. T.
  : *2025 IEEE International Solid-State Circuits Conference (ISSCC), IEEE.*

**APSQ: Additive Partial Sum Quantization with Algorithm-Hardware Co-Design**
  : <u>Tan, Y.</u>\*, Dong, P.\*, Wu, Y., Liu, Y., Liu, X., Luo, P., Liu, S. Y., Huang, X., Zhang, D., Liang, L., &amp; Cheng, K. T.
  : *2025 62nd ACM/IEEE Design Automation Conference (DAC), IEEE.*

**Genetic Quantization-Aware Approximation for Non-Linear Operations in Transformers**
  : Dong, P.\*, <u>Tan, Y.</u>\*, Zhang, D., Ni, T., Liu, X., Liu, Y., ... &amp; Cheng, K. T.
  : *2024 61st ACM/IEEE Design Automation Conference (DAC), IEEE.*

**A Reconfigurable Coprocessor for Simultaneous Localization and Mapping Algorithms in FPGA**
  : <u>Tan, Y.</u>\*, Deng, H.\*, Sun, M., Zhou, M., Chen, Y., Chen, L., ... &amp; An, F.
  : *IEEE Transactions on Circuits and Systems II: Express Briefs, 70(1), 286-290, 2022.*

**A Reconfigurable Visual-Inertial Odometry Accelerator with High Area and Energy Efficiency for Autonomous Mobile Robots**
  : <u>Tan, Y.</u>\*, Sun, M.\*, Deng, H., Wu, H., Zhou, M., Chen, Y., ... &amp; An, F.
  : *Sensors, 22(19), 7669, 2022.*

\* Authors marked with an asterisk contributed equally to the corresponding work.

## Honors and Awards

**Postgraduate Studentship (PGS) Award in HKUST**
  : Sept. 2023 - Present

**Best Teaching Assistant Award**, Department of Electronic and Computer Engineering, HKUST
  : Aug. 2025

**Outstanding Graduate (School Level)**, SUSTech
  : May 2023

**First-Class Outstanding Students Scholarship with the highest score**
  : Sept. 2022

**Undergraduate Innovation and Entrepreneurship Training Program**
  : Apr. 2022

**Shenzhen Longsys Electronics Company Award (Top 2% in the School of Microelectronics)**
  : Dec. 2021

**First Prize, 2021 National College Students FPGA Innovation Design Competition (Top 22 out of 1,341 teams)**
  : Dec. 2021

**First Prize, 2021 International Competition of Autonomous Running Robots (1st place out of 34 finalist teams)**
  : Oct. 2021

## Skills

**Research Interests:** Software/Hardware Co-Design, Model Compression, 3D Processing

**Programming Languages:** C, C++, Java, Python, SystemVerilog, Verilog HDL, VHDL

**Professional Software:** AutoCAD, Cadence, Design Compiler, IC Compiler II, MATLAB, Multisim, Silvaco

**Languages:** English (fluent), Mandarin (native), Cantonese (native)
