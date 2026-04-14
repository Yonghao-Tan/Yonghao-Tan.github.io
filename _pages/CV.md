---
layout: cv-modern
title: "Curriculum Vitae"
permalink: /cv/
description: "Curriculum Vitae of Yonghao Tan."
---

<div class="cv-shell">
  <header class="cv-hero">
    <div class="cv-hero__main">
      <p class="cv-hero__eyebrow">Curriculum Vitae</p>
      <h1 class="cv-hero__name">Yonghao Tan</h1>
      <p class="cv-hero__title">Ph.D. Candidate in Electronic and Computer Engineering, The Hong Kong University of Science and Technology (HKUST)</p>
      <div class="cv-chip-list">
        <span class="cv-chip">Software/Hardware Co-Design</span>
        <span class="cv-chip">Model Compression</span>
        <span class="cv-chip">3D Processing</span>
      </div>
      <p class="cv-hero__summary">Research interests include software/hardware co-design, model compression, and 3D processing.</p>
    </div>

    <aside class="cv-hero__panel">
      <ul class="cv-contact-list">
        <li>
          <span class="cv-contact__label">Address</span>
          <span class="cv-contact__value">HKUST, Clear Water Bay, Hong Kong, China</span>
        </li>
        <li>
          <span class="cv-contact__label">Phone</span>
          <a class="cv-contact__value" href="tel:+85253946864">+852 53946864</a>
        </li>
        <li>
          <span class="cv-contact__label">E-mail</span>
          <a class="cv-contact__value" href="mailto:ytanaz@connect.ust.hk">ytanaz@connect.ust.hk</a><br>
          <a class="cv-contact__value" href="mailto:yonghaot1017@gmail.com">yonghaot1017@gmail.com</a>
        </li>
        <li>
          <span class="cv-contact__label">Homepage</span>
          <a class="cv-contact__value" href="https://yonghao-tan.github.io/">https://yonghao-tan.github.io/</a>
        </li>
      </ul>

      <div class="cv-action-row">
        <a class="cv-action cv-action--primary" href="/files/CV_Yonghao%20Tan.pdf">Download PDF</a>
        <a class="cv-action cv-action--secondary" href="/files/CV_Yonghao%20Tan_CN.pdf">Chinese PDF</a>
      </div>
    </aside>
  </header>

  <div class="cv-layout">
    <main class="cv-column cv-column--main">
      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Research</p>
          <h2 class="cv-section__title">Research Experience</h2>
        </div>

        <article class="cv-entry">
          <div class="cv-entry__head">
            <div>
              <h3 class="cv-entry__title">5nm UCIe-Enabled Multi-Chiplet Generalizable Rendering Processor</h3>
              <p class="cv-entry__subtitle">AI Chip Center for Emerging Smart Systems, Hong Kong, China</p>
            </div>
            <p class="cv-entry__date">Mar. 2024 - Sept. 2025</p>
          </div>
          <ul class="cv-bullet-list">
            <li>Architected a 5nm 4-chiplet GeNeRF processor for generalizable rendering to address the heavy external-memory traffic induced by multi-view feature fetching.</li>
            <li>Introduced a UCIe-enabled cross-die unified cache, distributed source-view management, and balance-aware scheduling to maximize source-view reuse while reducing off-chip and cross-die data movement.</li>
            <li>Silicon results reached 91.43 TOPS/W, 55.43 FPS real-time rendering, and 0.29 uJ/pixel through hierarchical sparsity and hybrid NeRF-SR execution in a 45 mm x 45 mm MCM package footprint.</li>
          </ul>
        </article>

        <article class="cv-entry">
          <div class="cv-entry__head">
            <div>
              <h3 class="cv-entry__title">55nm ReRAM-on-Logic Stacked LLM Accelerator for Speculative Decoding</h3>
              <p class="cv-entry__subtitle">AI Chip Center for Emerging Smart Systems, Hong Kong, China</p>
            </div>
            <p class="cv-entry__date">Apr. 2024 - Aug. 2025</p>
          </div>
          <ul class="cv-bullet-list">
            <li>Architected a 55nm edge LLM accelerator whose logic die is stacked with four ReRAM dies via face-to-face bump bonding to support in-stack storage of draft-model codebooks.</li>
            <li>Developed block-clustered weight compression, local-rotation-based outlier-free W4A8 quantization, and adaptive parallel speculative decoding to reduce both target-model EMA and rejected-draft overhead.</li>
            <li>The prototype delivered 14.08 to 135.69 token/s and a 4.46x to 7.17x throughput speedup over a BF16 speculative-decoding baseline on a 55.98 mm<sup>2</sup> logic die.</li>
          </ul>
        </article>

        <article class="cv-entry">
          <div class="cv-entry__head">
            <div>
              <h3 class="cv-entry__title">28nm CNN-Transformer Accelerator for Semantic Segmentation</h3>
              <p class="cv-entry__subtitle">AI Chip Center for Emerging Smart Systems, Hong Kong, China</p>
            </div>
            <p class="cv-entry__date">Nov. 2021 - Sept. 2024</p>
          </div>
          <ul class="cv-bullet-list">
            <li>Architected a 28nm memory-compute-intensity-aware accelerator for high-resolution ConvFormer and SegFormer semantic-segmentation workloads.</li>
            <li>Combined hybrid-attention processing, data-reuse-oriented layer fusion, and cascaded feature-map pruning to reduce attention-side EMA and eliminate redundant KV and weight movement across fused blocks.</li>
            <li>Silicon results achieved 0.22 uJ/token on SegFormer-B0 and up to 52.90 TOPS/W peak efficiency in a 13.93 mm<sup>2</sup> chip.</li>
          </ul>
        </article>
      </section>

      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Publications</p>
          <h2 class="cv-section__title">Publications</h2>
        </div>

        <ol class="cv-publication-list">
          <li class="cv-publication">
            <div class="cv-publication__meta">
              <span class="cv-publication__year">2026</span>
              <span class="cv-publication__venue">CICC</span>
            </div>
            <div class="cv-publication__body">
              <p class="cv-publication__title"><em>A 5nm 91.43 TOPS/W 4-Chiplet Generalizable-Rendering-Processor with UCIe-Enabled Cross-Die-Cache and Balance-Aware Progressive Multi-Level Sparsity</em></p>
              <p class="cv-publication__authors">Tan, Y.*, Ma, S.*, Dong, P., Luo, P., Lei, Z., Lu, W., Ying, G., ... &amp; Cheng, K. T.</p>
              <p class="cv-publication__venue-text">In 2026 IEEE Custom Integrated Circuits Conference (CICC), IEEE.</p>
            </div>
          </li>

          <li class="cv-publication">
            <div class="cv-publication__meta">
              <span class="cv-publication__year">2026</span>
              <span class="cv-publication__venue">ISSCC</span>
            </div>
            <div class="cv-publication__body">
              <p class="cv-publication__title"><em>A 14.08-to-135.69Token/s ReRAM-on-Logic Stacked Outlier-Free Large-Language-Model Accelerator with Block-Clustered Weight-Compression and Adaptive Parallel-Speculative-Decoding</em></p>
              <p class="cv-publication__authors">Dong, P., Tan, Y., Liu, X., Luo, P., Liu, Y., Pang, D., Ma, S., ... &amp; Cheng, K. T.</p>
              <p class="cv-publication__venue-text">In 2026 IEEE International Solid-State Circuits Conference (ISSCC), IEEE.</p>
            </div>
          </li>

          <li class="cv-publication">
            <div class="cv-publication__meta">
              <span class="cv-publication__year">2025</span>
              <span class="cv-publication__venue">ISSCC</span>
            </div>
            <div class="cv-publication__body">
              <p class="cv-publication__title"><em>A 28nm 0.22uJ/Token Memory-Compute-Intensity-Aware CNN-Transformer Accelerator with Hybrid-Attention-Based Layer-Fusion and Cascaded Pruning for Semantic-Segmentation</em></p>
              <p class="cv-publication__authors">Dong, P.*, Tan, Y.*, Liu, X., Luo, P., Liu, Y., Liang, L., ... &amp; Cheng, K. T.</p>
              <p class="cv-publication__venue-text">In 2025 IEEE International Solid-State Circuits Conference (ISSCC), IEEE.</p>
            </div>
          </li>

          <li class="cv-publication">
            <div class="cv-publication__meta">
              <span class="cv-publication__year">2024</span>
              <span class="cv-publication__venue">DAC</span>
            </div>
            <div class="cv-publication__body">
              <p class="cv-publication__title"><em>Genetic Quantization-Aware Approximation for Non-Linear Operations in Transformers</em></p>
              <p class="cv-publication__authors">Dong, P.*, Tan, Y.*, Zhang, D., Ni, T., Liu, X., Liu, Y., ... &amp; Cheng, K. T.</p>
              <p class="cv-publication__venue-text">In 2024 61st ACM/IEEE Design Automation Conference (DAC), IEEE.</p>
            </div>
          </li>

          <li class="cv-publication">
            <div class="cv-publication__meta">
              <span class="cv-publication__year">2022</span>
              <span class="cv-publication__venue">TCAS-II</span>
            </div>
            <div class="cv-publication__body">
              <p class="cv-publication__title"><em>A Reconfigurable Coprocessor for Simultaneous Localization and Mapping Algorithms in FPGA</em></p>
              <p class="cv-publication__authors">Tan, Y.*, Deng, H.*, Sun, M., Zhou, M., Chen, Y., Chen, L., ... &amp; An, F.</p>
              <p class="cv-publication__venue-text">IEEE Transactions on Circuits and Systems II: Express Briefs, 70(1), 286-290.</p>
            </div>
          </li>

          <li class="cv-publication">
            <div class="cv-publication__meta">
              <span class="cv-publication__year">2022</span>
              <span class="cv-publication__venue">Sensors</span>
            </div>
            <div class="cv-publication__body">
              <p class="cv-publication__title"><em>A Reconfigurable Visual-Inertial Odometry Accelerator with High Area and Energy Efficiency for Autonomous Mobile Robots</em></p>
              <p class="cv-publication__authors">Tan, Y.*, Sun, M.*, Deng, H., Wu, H., Zhou, M., Chen, Y., ... &amp; An, F.</p>
              <p class="cv-publication__venue-text">Sensors, 22(19), 7669.</p>
            </div>
          </li>
        </ol>

        <p class="cv-footnote">* Authors marked with an asterisk contributed equally to the corresponding work.</p>
      </section>
    </main>

    <aside class="cv-column cv-column--side">
      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Academic</p>
          <h2 class="cv-section__title">Education &amp; Performance</h2>
        </div>

        <article class="cv-entry">
          <div class="cv-entry__head">
            <div>
              <h3 class="cv-entry__title">Ph.D. in Electronic and Computer Engineering</h3>
              <p class="cv-entry__subtitle">The Hong Kong University of Science and Technology (HKUST), Hong Kong, China</p>
            </div>
            <p class="cv-entry__date">Sept. 2023 - Present</p>
          </div>
          <p class="cv-entry__note">Supervised by Prof. Tim Kwang-Ting CHENG.</p>
        </article>

        <article class="cv-entry">
          <div class="cv-entry__head">
            <div>
              <h3 class="cv-entry__title">B.E. in Microelectronics</h3>
              <p class="cv-entry__subtitle">Southern University of Science and Technology (SUSTech), Shenzhen, Guangdong, China</p>
            </div>
            <p class="cv-entry__date">Sept. 2019 - Jun. 2023</p>
          </div>
          <p class="cv-entry__note">Supervised by Prof. Fengwei An.</p>
        </article>

        <div class="cv-fact-grid">
          <div class="cv-fact">
            <span class="cv-fact__label">Overall GPA</span>
            <span class="cv-fact__value">3.77 / 4.0</span>
          </div>
          <div class="cv-fact">
            <span class="cv-fact__label">Weighted Average</span>
            <span class="cv-fact__value">90.38</span>
          </div>
          <div class="cv-fact">
            <span class="cv-fact__label">Rank</span>
            <span class="cv-fact__value">11 / 77</span>
          </div>
        </div>
      </section>

      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Focus</p>
          <h2 class="cv-section__title">Research Interests</h2>
        </div>
        <div class="cv-chip-list cv-chip-list--soft">
          <span class="cv-chip">Software/Hardware Co-Design</span>
          <span class="cv-chip">Model Compression</span>
          <span class="cv-chip">3D Processing</span>
        </div>
      </section>

      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Recognition</p>
          <h2 class="cv-section__title">Honors &amp; Awards</h2>
        </div>
        <ul class="cv-list">
          <li><span class="cv-list__date">Aug. 2025</span><span class="cv-list__detail">Best Teaching Assistant Award, Department of Electronic and Computer Engineering, HKUST</span></li>
          <li><span class="cv-list__date">May 2023</span><span class="cv-list__detail">Outstanding Graduate (School Level), SUSTech</span></li>
          <li><span class="cv-list__date">Sept. 2022</span><span class="cv-list__detail">First-Class Outstanding Students Scholarship with the highest score</span></li>
          <li><span class="cv-list__date">Apr. 2022</span><span class="cv-list__detail">Undergraduate Innovation and Entrepreneurship Training Program</span></li>
          <li><span class="cv-list__date">Dec. 2021</span><span class="cv-list__detail">Shenzhen Longsys Electronics Company Award (Top 2% in the School of Microelectronics)</span></li>
          <li><span class="cv-list__date">Dec. 2021</span><span class="cv-list__detail">First Prize, 2021 National College Students FPGA Innovation Design Competition (Top 22 out of 1,341 teams)</span></li>
          <li><span class="cv-list__date">Oct. 2021</span><span class="cv-list__detail">First Prize, 2021 International Competition of Autonomous Running Robots (1st place out of 34 finalist teams)</span></li>
        </ul>
      </section>

      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Support</p>
          <h2 class="cv-section__title">Funding &amp; Support</h2>
        </div>
        <ul class="cv-list">
          <li><span class="cv-list__date">Sept. 2023 - Present</span><span class="cv-list__detail">Postgraduate Studentship (PGS) Award in HKUST</span></li>
          <li><span class="cv-list__date">Apr. 2022</span><span class="cv-list__detail">Undergraduate Innovation and Entrepreneurship Training Programs (Provincial Level)</span></li>
          <li><span class="cv-list__date">Jul. 2021</span><span class="cv-list__detail">Guangdong College Students' Scientific and Technological Innovation (Provincial Level)</span></li>
        </ul>
      </section>

      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Tooling</p>
          <h2 class="cv-section__title">Skills</h2>
        </div>
        <div class="cv-skill-grid">
          <div class="cv-skill-group">
            <h3>Programming Languages</h3>
            <p>C, C++, Java, Python, System Verilog, Verilog HDL, VHDL</p>
          </div>
          <div class="cv-skill-group">
            <h3>Professional Software</h3>
            <p>AutoCAD, Cadence, Design Compiler, IC Compiler II, MATLAB, Multisim, Silvaco</p>
          </div>
        </div>
      </section>

      <section class="cv-section">
        <div class="cv-section__header">
          <p class="cv-section__eyebrow">Communication</p>
          <h2 class="cv-section__title">Languages</h2>
        </div>
        <div class="cv-chip-list cv-chip-list--soft">
          <span class="cv-chip">English (fluent)</span>
          <span class="cv-chip">Mandarin (native)</span>
          <span class="cv-chip">Cantonese (native)</span>
        </div>
      </section>
    </aside>
  </div>
</div>
