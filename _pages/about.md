---
permalink: /
title: ""
excerpt: ""
author_profile: true
show_visitor_chart: true
redirect_from:
  - /about/
  - /about.html
---

<!-- Google Scholar Stats disabled
{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}
-->

<span class='anchor' id='about-me'></span>
I am a third-year PhD candidate in the Department of Electronic and Computer Engineering at [The Hong Kong University of Science and Technology](https://hkust.edu.hk/), affiliated with the [AI Chip Center for Emerging Smart Systems](https://inno-access.hk/) and the [Vision and System Design Lab (VSDL)](https://vsdl.hkust.edu.hk/index.html), under the supervision of [Prof. Kwang-Ting CHENG](https://seng.hkust.edu.hk/about/people/faculty/tim-kwang-ting-cheng). A concise version of my experience is available in my [CV]({{ '/files/CV_Yonghao_Tan.pdf' | relative_url }}).

Before joining HKUST, I received my B.E. in Microelectronics from the [School of Microelectronics](https://sme.sustech.edu.cn/), [Southern University of Science and Technology](https://www.sustech.edu.cn/), where I worked with [Prof. Fengwei An](https://sme.sustech.edu.cn/index/teacher/neiye/id/35.html).

My research interests include software-hardware co-design, AI accelerators, LLM/VLM systems, and 3D processing.
<!-- with total <a href='https://scholar.google.com/citations?user=o-J8B_4AAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a>  -->
<!-- (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=o-J8B_4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->

<span class='anchor' id='news'></span>
# News
- *2026.01*: One paper is accepted by CICC 2026.
- *2025.10*: One paper is accepted by ISSCC 2026.
- *2025.02*: One paper is accepted by DAC 2025.
- *2024.10*: One paper is accepted by ISSCC 2025.
- *2024.02*: One paper and one poster are accepted by DAC 2024.
- *2022.08*: Our second paper of the SLAM accelerator project is accepted by *Sensors*.
- *2022.08*: Our first paper of the SLAM accelerator project, my first paper, is accepted by *TCAS-II*.
- *2021.12*: Our team won the first prize in the 2021 National College Students FPGA Innovation Design Competition.
- *2021.10*: Our team won the first prize in the 2021 International Competition of Autonomous Running Robots.

<span class='anchor' id='research-projects'></span>
# Research Projects

- **5nm UCIe-Enabled Multi-Chiplet Generalizable Rendering Processor** (*Mar. 2024 - Sept. 2025*)
  - Architected a 5nm 4-chiplet GeNeRF processor for generalizable rendering to address the heavy external-memory traffic induced by multi-view feature fetching.
  - Introduced a UCIe-enabled cross-die unified cache, distributed source-view management, and balance-aware scheduling to maximize source-view reuse while reducing off-chip and cross-die data movement.
  - Silicon results reached 91.43 TOPS/W, 55.43 FPS real-time rendering, and 0.29 uJ/pixel through hierarchical sparsity and hybrid NeRF-SR execution in a 45 mm x 45 mm MCM package footprint.

- **55nm ReRAM-on-Logic Stacked LLM Accelerator for Speculative Decoding** (*Apr. 2024 - Aug. 2025*)
  - Architected a 55nm edge LLM accelerator whose logic die is stacked with four ReRAM dies via face-to-face bump bonding to support in-stack storage of draft-model codebooks.
  - Developed block-clustered weight compression, local-rotation-based outlier-free W4A8 quantization, and adaptive parallel speculative decoding to reduce both target-model EMA and rejected-draft overhead.
  - The prototype delivered 14.08 to 135.69 token/s and a 4.46x to 7.17x throughput speedup over a BF16 speculative-decoding baseline on a 55.98 mm² logic die.

- **28nm CNN-Transformer Accelerator for Semantic Segmentation** (*Nov. 2021 - Sept. 2024*)
  - Architected a 28nm memory-compute-intensity-aware accelerator for high-resolution ConvFormer and SegFormer semantic-segmentation workloads.
  - Combined hybrid-attention processing, data-reuse-oriented layer fusion, and cascaded feature-map pruning to reduce attention-side EMA and eliminate redundant KV and weight movement across fused blocks.
  - Silicon results achieved 0.22 uJ/token on SegFormer-B0 and up to 52.90 TOPS/W peak efficiency in a 13.93 mm² chip.

<span class='anchor' id='publications'></span>
# Publications

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.ieee-cicc.org/" style="color: white; text-decoration:none">CICC 2026</a></div><img src='{{ "/images/2026_cicc.png" | relative_url }}' alt="CICC 2026 paper thumbnail" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
**A 5nm 91.43 TOPS/W 4-Chiplet Generalizable-Rendering-Processor with UCIe-Enabled Cross-Die-Cache and Balance-Aware Progressive Multi-Level Sparsity**

**Yonghao Tan\***, Songchen Ma\*, Pingcheng Dong, Peng Luo, Zhiyuan Lei, Wencai Lu, Guangxi Ying, Man-To Yung, Haibo Zhao, Lan Liu, Yuzhong Jiao, Xuejiao Liu, Yu Liu, Li Li, Luhong Liang, Mao Liu, Kwang-Ting Cheng

*Equal contribution.*
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.isscc.org/" style="color: white; text-decoration:none">ISSCC 2026</a></div><img src='{{ "/images/2026_isscc.jpg" | relative_url }}' alt="ISSCC 2026 paper thumbnail" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
**A 14.08-to-135.69 Token/s ReRAM-on-Logic Stacked Outlier-Free Large-Language-Model Accelerator with Block-Clustered Weight-Compression and Adaptive Parallel-Speculative-Decoding**

Pingcheng Dong, **Yonghao Tan**, Xuejiao Liu, Peng Luo, Yu Liu, Di Pang, Songchen Ma, Xijie Huang, Shih-Yang Liu, Dong Zhang, Luhong Liang, Chi-Ying Tsui, Fengbin Tu, Liang Zhao, Kwang-Ting Cheng
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.dac.com/" style="color: white; text-decoration:none">DAC 2025</a></div><img src='{{ "/images/2025_dac.jpg" | relative_url }}' alt="DAC 2025 paper thumbnail" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[APSQ: Additive Partial Sum Quantization with Algorithm-Hardware Co-Design](https://dl.acm.org/doi/10.1109/DAC63849.2025.11133081)

**Yonghao Tan\***, Pingcheng Dong\*, Yongkun Wu, Yu Liu, Xuejiao Liu, Peng Luo, Shih-Yang Liu, Xiejie Huang, Dong Zhang, Luhong Liang, Kwang-Ting Cheng

*Equal contribution.*
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.isscc.org/" style="color: white; text-decoration:none">ISSCC 2025</a></div><img src='{{ "/images/2025_isscc.png" | relative_url }}' alt="ISSCC 2025 paper thumbnail" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[A 28nm 0.22uJ/Token Memory-Compute-Intensity-Aware CNN-Transformer Accelerator with Hybrid-Attention-Based Layer-Fusion and Cascaded Pruning for Semantic Segmentation](https://ieeexplore.ieee.org/abstract/document/10904499/)

Pingcheng Dong\*, **Yonghao Tan\***, Xuejiao Liu, Peng Luo, Yu Liu, Luhong Liang, Yitong Zhou, Di Pang, Manto Yung, Dong Zhang, Xijie Huang, Shih-Yang Liu, Yongkun Wu, Fengshi Tian, Chi-Ying Tsui, Fengbin Tu, Kwang-Ting Cheng

*Equal contribution.*
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.dac.com/" style="color: white; text-decoration:none">DAC 2024</a></div><img src='{{ "/images/2024_dac.png" | relative_url }}' alt="DAC 2024 paper thumbnail" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[Genetic Quantization-Aware Approximation for Non-Linear Operations in Transformers](https://dl.acm.org/doi/abs/10.1145/3649329.3657314)

Pingcheng Dong\*, **Yonghao Tan\***, Dong Zhang, Tianwei Ni, Xuejiao Liu, Yu Liu, Peng Luo, Luhong Liang, Shih-Yang Liu, Xijie Huang, Huaiyu Zhu, Yun Pan, Fengwei An, Kwang-Ting Cheng

*Equal contribution.*
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=8920" style="color: white; text-decoration:none">TCAS-II</a></div><img src='{{ "/images/TCAS2.png" | relative_url }}' alt="TCAS-II paper thumbnail" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[A Reconfigurable Coprocessor for Simultaneous Localization and Mapping Algorithms in FPGA](https://ieeexplore.ieee.org/document/9857612)

**Yonghao Tan\***, Huanshihong Deng\*, Mengying Sun, Minghao Zhou, Yifei Chen, Lei Chen, Chao Wang, Fengwei An

*Equal contribution.*
</div>
</div>

<span class='anchor' id='honors-and-awards'></span>
# Honors and Awards
- *2025.08* Best Teaching Assistant Award, Department of Electronic and Computer Engineering, HKUST
- *2023.05* Outstanding Graduate (School Level), SUSTech
- *2022.09* First-Class Outstanding Students Scholarship with the highest score
- *2022.04* Undergraduate Innovation and Entrepreneurship Training Program
- *2021.12* [Shenzhen Longsys Electronics Company Award](https://mp.weixin.qq.com/s/VHIBf6Eoyta85k2y93iQDQ) (Top 2% in the School of Microelectronics)
- *2021.12* [First Prize, 2021 National College Students FPGA Innovation Design Competition](https://sme.sustech.edu.cn/index/news/neiye/id/501.html) (Top 22 out of 1,341 teams)
- *2021.10* [First Prize, 2021 International Competition of Autonomous Running Robots](https://newshub.sustech.edu.cn/html/202110/41348.html) (1st place out of 34 finalist teams)

<span class='anchor' id='education'></span>
# Education
- *2023.09 - present*, Doctor of Philosophy, Electronic and Computer Engineering, The Hong Kong University of Science and Technology, Hong Kong SAR, China.
- *2019.09 - 2023.06*, Bachelor of Engineering, Microelectronics, Experimental Class, School of Microelectronics, Southern University of Science and Technology, Shenzhen, China. **GPA: 3.77.**
- *2016.09 - 2019.06*, Shimen Middle School, Foshan, China.

<!-- # Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. \| [\[video\]](https://github.com/) -->

<!-- # Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China. -->

# Teaching Assistant
- ELEC2350: Introduction to Computer Organization and Design (2025 Fall)
- ELEC3400: Introduction to Integrated Circuits and Systems (2024 Spring)
- ELEC6910H: Advanced AI Chip and System (2024 Fall)
