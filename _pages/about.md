---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
I am currently a third-year PhD candidate student in the Electronic and Computer Engineering department of [Hong Kong University of Science and Technology](https://hkust.edu.hk/), [AI Chip Center for Emerging Smart Systems](https://inno-access.hk/), and a member of [Vision and System Design Lab (VSDL)](https://vsdl.hkust.edu.hk/index.html) under the supervision of [Prof. Kwang-Ting CHENG](https://seng.hkust.edu.hk/about/people/faculty/tim-kwang-ting-cheng). If you are interested, here is my [CV](https://Yonghao-Tan.github.io/files/CV_Yonghao Tan.pdf).

In terms of my undergraduate study, I was at [School of Microelectronics](https://sme.sustech.edu.cn/) , [Southern University of Science and Technology](https://www.sustech.edu.cn/) (南方科技大学深港微电子学院), advised by [Fengwei An (安丰伟)](https://sme.sustech.edu.cn/index/teacher/neiye/id/35.html).

My research interest includes software/hardware co-design AI chip, LLM/VLM, and 3d processing.
<!-- with total <a href='https://scholar.google.com/citations?user=o-J8B_4AAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a>  -->
<!-- (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=o-J8B_4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->

# 🔥 News
<!-- - *2022.02*: &nbsp;🎉🎉 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
- *2025.02*: &nbsp;🎉🎉 One paper is accepted by ISSCC 2026! 
- *2025.02*: &nbsp;🎉🎉 One paper is accepted by DAC 2025! 
- *2024.10*: &nbsp;🎉🎉 One paper is accepted by ISSCC 2025! 
- *2024.02*: &nbsp;🎉🎉 One paper and one poster are accepted by DAC 2024! 
- *2022.08*: &nbsp;🎉🎉 Our second paper of the SLAM accelerator project is accepted by Sensors! 
- *2022.08*: &nbsp;🎉🎉 Our first paper of the SLAM accelerator project (my first paper) is accepted by TCAS-II! 
- *2021.12*: &nbsp;🎉🎉 Our team won the first prize of 2021 National College Students FPGA Innovation Design Competition! 
- *2021.10*: &nbsp;🎉🎉 Our team won the first prize of 2021 International Competition of Autonomous Running Robots! 

# 📝 Publications 

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.isscc.org/" style="color: white; text-decoration:none">ISSCC 2026</a></div><img src='images/2026_isscc.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[A 14.08-to-135.69Token/s ReRAM-on-Logic Stacked Outlier-Free Large-Language-Model Accelerator with Block-Clustered Weight-Compression and Adaptive  Parallel-Speculative-Decoding]()

Pingcheng Dong, **Yonghao Tan**, Xuejiao Liu, Peng Luo, Yu Liu, Di Pang, Songchen Ma, Xijie Huang, Shih-Yang Liu, Dong Zhang, Luhong Liang, Chi-Ying Tsui, Fengbin Tu, Liang Zhao, Kwang-Ting Cheng

<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.isscc.org/" style="color: white; text-decoration:none">DAC 2025</a></div><img src='images/2025_dac.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[APSQ: Additive Partial Sum Quantization with Algorithm-Hardware Co-Design](https://dl.acm.org/doi/10.1109/DAC63849.2025.11133081)

**Yonghao Tan\***, Pingcheng Dong\*, Yongkun Wu, Yu Liu, Xuejiao Liu, Peng Luo, Shih-Yang Liu, Xiejie Huang, Dong Zhang, Luhong Liang, Kwang-Ting Cheng

*Equally Credited Authors (ECAs)

<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.isscc.org/" style="color: white; text-decoration:none">ISSCC 2025</a></div><img src='images/2025_isscc.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[A 28nm 0.22μJ/Token Memory-Compute-Intensity-Aware CNN-Transformer Accelerator with Hybrid-Attention-Based Layer-Fusion and Cascaded Pruning for Semantic-Segmentation](https://ieeexplore.ieee.org/abstract/document/10904499/)

Pingcheng Dong\*, **Yonghao Tan\***, Xuejiao Liu, Peng Luo, Yu Liu, Luhong Liang, Yitong Zhou, Di Pang, Manto Yung, Dong Zhang, Xijie Huang, Shih-Yang Liu, Yongkun Wu, Fengshi Tian, Chi-Ying Tsui, Fengbin Tu, Kwang-Ting Cheng

*Equally Credited Authors (ECAs)

<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://dl.acm.org/doi/proceedings/10.5555/3778334" style="color: white; text-decoration:none">DAC 2024</a></div><img src='images/2024_dac.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[Genetic Quantization-Aware Approximation for Non-Linear Operations in Transformers](https://dl.acm.org/doi/abs/10.1145/3649329.3657314)

Pingcheng Dong\*, **Yonghao Tan\***, Dong Zhang, Tianwei Ni, Xuejiao Liu, Yu Liu, Peng Luo, Luhong Liang, Shih-Yang Liu, Xijie Huang, Huaiyu Zhu, Yun Pan, Fengwei An, Kwang-Ting Cheng

*Equally Credited Authors (ECAs)

<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=8920" style="color: white; text-decoration:none">TCAS-II</a></div><img src='images/TCAS2.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">
[A Reconfigurable Coprocessor for Simultaneous Localization and Mapping Algorithms in FPGA](https://ieeexplore.ieee.org/document/9857612)

**Yonghao Tan\***, Huanshihong Deng\*, Mengying Sun, Minghao Zhou, Yifei Chen, Lei Chen, Chao Wang, Fengwei An

*Equally Credited Authors (ECAs)

<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge"><a href="https://www.mdpi.com/journal/sensors" style="color: white; text-decoration:none">Sensors</a></div><img src='images/Sensors.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

<!-- [A Reconfigurable Coprocessor for Simultaneous Localization](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf) -->
<!-- [A Reconfigurable Visual-Inertial Odometry Accelerator with High Area and Energy Efficiency for Autonomous Mobile Robots](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf) (under review) -->
[A Reconfigurable Visual-Inertial Odometry Accelerator with High Area and Energy Efficiency for Autonomous Mobile Robots](https://www.mdpi.com/1424-8220/22/19/7669)

**Yonghao Tan\***, Mengying Sun\*, Huanshihong Deng, Haihan Wu, Minghao Zhou, Yifei Chen, Zhuo Yu, Qinghan Zeng, Ping Li, Lei Chen, Fengwei An

*Equally Credited Authors (ECAs)

</div>
</div>
<!-- [**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  -->

<!-- - [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->

# 🎖 Honors and Awards
- *2025.08* Best Teaching Assistant Award of ECE Department in HKUST
- *2023.05* Outstanding graduates at the school level of SUSTech
- *2022.09* Highest Score in First-class Outstanding Students Scholarship
- *2022.04* Undergraduate Innovation and Entrepreneurship Training Programs
- *2021.12* [Shenzhen Longsys Electronics Company Award](https://mp.weixin.qq.com/s/VHIBf6Eoyta85k2y93iQDQ) (Top 2% in School of Microelectronics)
- *2021.12* [The First Prize of 2021 National College Students FPGA innovation design competition](https://sme.sustech.edu.cn/index/news/neiye/id/501.html) (Top 22 in 1341 teams)
- *2021.10* [The First Prize of 2021 International Competition of Autonomous Running Robots](https://newshub.sustech.edu.cn/html/202110/41348.html) (Top 1 of 34 teams in final match)
- *2021.09* Second-class Outstanding Students Scholarship
- *2021.07* Guangdong College Students' Scientific and Technological Innovation
- *2020.09* Second-class Outstanding Students Scholarship

# 📖 Educations
- *2023.09 - present*, Doctor of Philosophy, Electronic and Computer Engineering, The Hong Kong University of Science and Technology, Hong Kong SAR, China.
- *2019.09 - present*, Undergraduate, Microelectronics, Experimental Class, School of Microelectronics, Southern University of Science and Technology, Shenzhen, China. **GPA: 3.77.**
- *2016.09 - 2019.06*, Shimen Middle School, Foshan, China.

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

<!-- # 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China. -->
<!-- - files: set up /files/ and put files into it -->
<!-- # 📚 [CV](https://Yonghao-Tan.github.io/files/CV_YonghaoTan.pdf) -->

# 📚 Research Projects
- Hybrid Bonding based co-design AI accelerator (AC-RHB)
  - Co-design optimization for LLMs
  - Implement the AI-core and RERAM with 55nm die-on-wafer stacking via bumping process

- Transformer based co-design AI accelerator (AC-Transformer)
  - Hardware/Software collaborative optimization of Transformer-based architecture
  - Implement an energy-efficient Transformer-based accelerator for semantic segmentation with 28nm ASIC process

- ASIC design of SLAM accelerator in 28nm CMOS technology
  - Propose a reconfigurable visual-inertial odometry accelerator and implemented it on FPGA platform which can process data from image sensor and inertial measurement unit for trajectory output in real-time at 160MHz and 110fps
  - Optimize the hardware architecture and perform back-end design for ASIC development

# 😀 Teaching Assistant
- ELEC2350: Introduction to Computer Organization and Design (2025 Fall)
- ELEC3400: Introduction to Integrated Circuits and Systems (2024 Spring)
- ELEC6910H: Advanced AI Chip and System (2024 Fall)