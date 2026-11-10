(function attachCourseContent(root) {
  "use strict";

  root.GRID_COURSE = {
    meta: {
      title: "国家电网业务知识体系",
      stage: "基础阶段",
      version: "v1.0",
      updatedAt: "2026-11-10",
    },
    chapters: [
      {
        id: "1",
        number: "01",
        title: "从发电到用电",
        subtitle: "先建立一张能贯穿营销、计量、采集、运检和现场作业的业务地图",
        duration: "约 12 分钟",
        tags: ["电力系统", "业务对象", "数据关系"],
        objectives: [
          "说明发电、输电、变电、配电和用电之间的关系。",
          "区分物理电网、业务关系与信息系统记录。",
          "把计量箱、台区、电能表和客户放到同一张关系图中。",
          "理解为什么页面字段正确，不一定代表现场关系和档案一致。",
        ],
        sections: [
          {
            id: "goals",
            short: "目标",
            title: "1. 本节学习目标",
            html: `
              <div class="objective-grid">
                <div class="objective-card"><span>01</span><p>能读懂“发—输—变—配—用”这条电力主线。</p></div>
                <div class="objective-card"><span>02</span><p>能区分设备资产、物理拓扑和客户业务关系。</p></div>
                <div class="objective-card"><span>03</span><p>能解释为什么现场和系统档案会出现不一致。</p></div>
                <div class="objective-card"><span>04</span><p>能把熟悉的项目页面放回完整业务脉络中。</p></div>
              </div>
              <div class="callout callout-green">
                <strong>为什么先学这一章？</strong>
                <p>开发国网业务系统时，页面上的“台区”“计量箱”“电能表”不是普通字段，而是现实世界中的设备、位置、责任和业务关系的组合。先知道它们在物理世界中的位置，后面才能理解接口为什么这样设计、历史为什么不能覆盖。</p>
              </div>
            `,
          },
          {
            id: "background",
            short: "背景",
            title: "2. 业务背景",
            html: `
              <p>假设一个计量箱建档页面同时显示：台区名称、配变名称、计量箱编号、电能表编号、用电地址和客户名称。字段都能保存，业务结果却不一定可靠。</p>
              <div class="split-panel">
                <div class="panel panel-paper">
                  <p class="panel-label">研发看到的</p>
                  <h3>一条能提交的数据</h3>
                  <p>表单校验通过，接口返回成功，页面提示“建档完成”。</p>
                </div>
                <div class="panel panel-mint">
                  <p class="panel-label">现场关心的</p>
                  <h3>一条真实可追溯的关系</h3>
                  <p>箱子由哪台配变供电、箱内装了几只表、表对应哪个客户、换表后旧数据如何衔接。</p>
                </div>
              </div>
              <p>信息系统表面上管理字段，业务上管理的是<strong>现实设备、设备关系以及围绕设备发生的活动</strong>。</p>
            `,
          },
          {
            id: "concepts",
            short: "概念",
            title: "3. 核心概念",
            html: `
              <div class="concept-list">
                <article>
                  <h3>电力系统</h3>
                  <p><strong>通俗理解：</strong>生产、输送、分配和使用电能，并保证其安全运行的整套体系。</p>
                  <p><strong>业务作用：</strong>营销、调度、运检、计量和采集都围绕这张网络工作，只是关注的对象和活动不同。</p>
                </article>
                <article>
                  <h3>配电网</h3>
                  <p><strong>通俗理解：</strong>把电能从上级电网分配至不同区域和用户的网络。</p>
                  <p>它不仅包含线路，还可能包含配电变压器、开关、电缆分支设施、计量设施和自动化终端。随着分布式光伏、储能和充电设施接入，配电网也可能出现双向能量流动。</p>
                  <a class="source-link" href="https://zfxxgk.nea.gov.cn/2024-02/06/c_1310765994.htm" target="_blank" rel="noreferrer">依据：国家能源局配电网高质量发展指导意见</a>
                </article>
                <article>
                  <h3>配电变压器</h3>
                  <p><strong>通俗理解：</strong>改变电压等级，把上一级电能送给低压配电网络的设备。</p>
                  <p><strong>容易混淆：</strong>它是具体的物理设备；台区则是围绕配变和低压供电范围形成的管理对象，二者不能直接画等号。</p>
                </article>
                <article>
                  <h3>台区</h3>
                  <p><strong>通俗理解：</strong>一台配变及其低压供电范围内的线路、计量设施和用户组成的业务管理单元。</p>
                  <p>“台区”的具体边界、编码和管理口径存在标准与省公司实现差异。系统设计时应避免只用一个<code>台区编号</code>字段替代配变、拓扑、责任范围和用户归属。</p>
                </article>
              </div>
              <div class="term-compare">
                <div><strong>设备资产</strong><span>现实世界里存在什么</span></div>
                <div><strong>物理拓扑</strong><span>设备和设备怎样连接</span></div>
                <div><strong>业务关系</strong><span>谁使用、谁负责、谁计量</span></div>
              </div>
            `,
          },
          {
            id: "objects",
            short: "对象",
            title: "4. 业务对象及关系",
            html: `
              <p>下面是一条常见的低压居民供电路径，用于建立空间感。它不是所有用户都采用的唯一结构。</p>
              <div class="topology-strip" role="img" aria-label="从电源到客户的供电关系示意">
                <div><span>电源</span><strong>电厂 / 分布式电源</strong></div>
                <i aria-hidden="true">→</i>
                <div><span>网络</span><strong>输电与变电站</strong></div>
                <i aria-hidden="true">→</i>
                <div><span>分配</span><strong>配电线路与配变</strong></div>
                <i aria-hidden="true">→</i>
                <div><span>接入</span><strong>低压线路 / 计量箱</strong></div>
                <i aria-hidden="true">→</i>
                <div><span>计量</span><strong>电能表 / 采集终端</strong></div>
                <i aria-hidden="true">→</i>
                <div><span>业务</span><strong>供电点 / 客户</strong></div>
              </div>
              <div class="relation-grid">
                <div class="relation-card">
                  <span>箱组</span>
                  <strong>柜体组合与空间位置</strong>
                  <p>项目中的箱组可以有编号、名称、地址和多个箱位。</p>
                </div>
                <div class="relation-card">
                  <span>计量箱</span>
                  <strong>资产、安装位置与表位载体</strong>
                  <p>一个箱内可能有多个表位，并关联电能表、互感器、终端和封印。</p>
                </div>
                <div class="relation-card">
                  <span>计量点</span>
                  <strong>发生计量的业务位置</strong>
                  <p>换表时计量点通常延续，电能表的安装关系发生变化。</p>
                </div>
                <div class="relation-card">
                  <span>供电点</span>
                  <strong>电能送达的具体业务位置</strong>
                  <p>客户可以拥有多个供电点，地址和用电用途需要分别记录。</p>
                </div>
              </div>
              <div class="callout callout-amber">
                <strong>关系不是永久写死的一对一。</strong>
                <p>台区可包含多个客户；一个客户可有多个供电点；一个计量箱可装多只电能表；一只电能表在生命周期内也可能先后关联不同计量点。</p>
              </div>
            `,
          },
          {
            id: "process",
            short: "流程",
            title: "5. 业务流程",
            html: `
              <p>学习时需要同时区分三条线：</p>
              <div class="process-lanes">
                <div>
                  <span>电力流</span>
                  <p>电源 → 电网 → 配变 → 用户设备</p>
                </div>
                <div>
                  <span>信息流</span>
                  <p>电能表 → 采集终端/通道 → 采集主站 → 营销等业务系统</p>
                </div>
                <div>
                  <span>业务流</span>
                  <p>客户申请 / 巡视发现 → 现场作业 → 档案变更 → 验收归档</p>
                </div>
              </div>
              <h3>以一次低压新装为例</h3>
              <ol class="step-list">
                <li><b>客户提出申请</b><span>营业人员受理客户和用电地址，形成业务入口。</span></li>
                <li><b>现场勘察</b><span>确认电源、供电方案、安装位置和计量方式。</span></li>
                <li><b>建设与装表</b><span>现场形成配变、线路、计量箱、电能表和客户之间的真实连接。</span></li>
                <li><b>档案建立</b><span>把客户、供电点、计量点、台区、设备和安装关系写入系统。</span></li>
                <li><b>采集接入</b><span>电能表、终端、通信和主站形成数据链路。</span></li>
                <li><b>持续运营</b><span>形成电量、电费、巡视、缺陷整改、换表和销户等后续业务。</span></li>
              </ol>
              <div class="exception-box">
                <strong>常见异常</strong>
                <ul>
                  <li>现场已用电，系统缺少有效供电点或计量关系。</li>
                  <li>设备实际属于 A 台区，档案却挂在 B 台区。</li>
                  <li>电能表已安装，但采集关系或通信地址未同步。</li>
                  <li>换表只覆盖旧表记录，没有保留计量连续性。</li>
                </ul>
              </div>
            `,
          },
          {
            id: "project-case",
            short: "项目案例",
            title: "6. 本地项目案例",
            html: `
              <div class="case-header">
                <div><span>案例来源</span><strong>计量箱建档 + 设备主人巡视</strong></div>
                <div class="case-badge">本地项目观察</div>
              </div>
              <p>现场人员扫描一个计量箱后，建档或巡视应用需要同时处理以下信息：</p>
              <div class="data-chip-group">
                <span>箱组</span><span>计量箱资产编号</span><span>安装地址</span><span>所属台区</span>
                <span>表位行列</span><span>电能表</span><span>通信地址</span><span>互感器变比</span>
                <span>采集终端</span><span>封印</span><span>现场照片</span>
              </div>
              <h3>业务问题不是“多填几个字段”</h3>
              <p>箱表关系决定某只表安装在哪个箱、哪个表位；台区关系影响供电归属和线损分析；互感器变比影响计量倍率；封印记录影响现场安全责任；现场照片和定位构成作业证据。</p>
              <div class="project-pair">
                <div><span>计量箱建档</span><p>解决“现场资产如何准确进入档案，以及箱、表位、表和设备如何关联”。</p></div>
                <div><span>设备主人巡视</span><p>解决“设备主人如何按照台区和设备清单核对现场、发现异常并形成后续任务”。</p></div>
              </div>
            `,
          },
          {
            id: "software",
            short: "软件视角",
            title: "7. 软件研发视角",
            html: `
              <p>建议把对象关系拆为四类，而不是全部塞进一张“客户设备表”：</p>
              <div class="model-table">
                <div class="model-row model-head"><span>数据维度</span><span>回答的问题</span><span>典型对象</span></div>
                <div class="model-row"><span>资产</span><span>有什么设备，属于谁</span><span>配变、计量箱、电能表</span></div>
                <div class="model-row"><span>拓扑</span><span>设备之间如何连接</span><span>线路节点、接入点、挂接关系</span></div>
                <div class="model-row"><span>业务</span><span>谁使用、谁计量、谁负责</span><span>客户、供电点、计量点、设备主人</span></div>
                <div class="model-row"><span>活动</span><span>发生了什么，结果是什么</span><span>工单、巡视、缺陷、换表、档案变更</span></div>
              </div>
              <div class="code-card">
                <div class="code-title">示意模型，不是国网正式数据库结构</div>
                <pre><code>grid_asset             设备身份、状态、产权、位置
topology_relation      from_node、to_node、生效和失效时间
customer               客户身份与联系信息
service_point          供电点、地址和有效状态
metering_point         计量位置与用途
meter_installation     电能表在某计量点上的安装时段
work_order             业务活动、处理人、结果和证据</code></pre>
              </div>
              <div class="split-panel">
                <div class="panel">
                  <p class="panel-label">接口</p>
                  <p>同时传业务 ID、所属组织、生效时间、来源系统、版本和变更原因，不能只传名称。</p>
                </div>
                <div class="panel">
                  <p class="panel-label">历史</p>
                  <p>换表、迁址、关系调整和档案修正使用失效—新建关系，避免覆盖原记录。</p>
                </div>
                <div class="panel">
                  <p class="panel-label">异常</p>
                  <p>先识别数据源和现场事实，再决定修正责任；不要让前端通过自由编辑掩盖跨系统冲突。</p>
                </div>
              </div>
            `,
          },
          {
            id: "summary",
            short: "总结",
            title: "8. 本节总结",
            html: `
              <div class="takeaway-list">
                <div><span>1</span><p>软件字段是对现实设备、关系和活动的抽象。</p></div>
                <div><span>2</span><p>电力流、信息流和业务流相关，但不能互相替代。</p></div>
                <div><span>3</span><p>配变是设备，台区是围绕供电范围形成的管理对象。</p></div>
                <div><span>4</span><p>资产、拓扑、客户关系和计量关系必须分开建模。</p></div>
                <div><span>5</span><p>换表、迁移和修正要保留有效时间及变更证据。</p></div>
              </div>
            `,
          },
        ],
        quiz: [
          {
            id: "q1-1",
            question:
              "营销系统已显示“客户甲—供电点甲—台区A—电能表M1”，这能说明现场设备和接线一定完全正确吗？",
            options: [
              "能，记录已经形成完整业务链路",
              "不能，系统关系与现场物理拓扑需要分别核实",
              "能，只要电能表能采集数据就说明全部正确",
              "不能，因为营销系统不能保存客户信息",
            ],
            correct: 1,
            explanation:
              "系统记录只能证明数据层形成了关系，不能单独证明现场配变、低压线路、计量箱和表位真实一致。",
            optionNotes: [
              "业务链路完整不代表现场拓扑已经核实。",
              "正确答案：系统档案与现场物理关系必须交叉验证。",
              "采集成功只能说明部分通信链路有效，不能覆盖全部关系。",
              "营销业务本身就会管理客户及供电业务关系。",
            ],
          },
          {
            id: "q1-2",
            question: "关于台区，哪种理解最适合软件业务建模？",
            options: [
              "台区就是一台配电变压器",
              "台区就是供电所这个组织",
              "台区是围绕配变及低压供电范围形成的管理对象，具体边界需结合业务口径",
              "台区就是客户所在的行政区",
            ],
            correct: 2,
            explanation:
              "配变是核心设备，台区还包含低压供电设施、范围内用户和管理关系；具体定义与省公司实现有关。",
            optionNotes: [
              "配变只是台区的核心设备之一。",
              "组织机构与供电管理对象不是同一维度。",
              "正确答案：同时保留设备、范围、用户和管理关系。",
              "供电范围可以跨越行政边界，不能简单等同。",
            ],
          },
          {
            id: "q1-3",
            question:
              "现场发现计量箱实际由A号配变供电，但系统档案挂在B号台区。较合理的处理方式是什么？",
            options: [
              "直接把台区字段改成A，不需要核实其他关系",
              "只修改客户归属，不处理计量箱和拓扑",
              "删除原计量箱记录，重新建立一个没有历史的箱",
              "核对现场接线、档案来源和影响范围，保留证据及有效时间后修正",
            ],
            correct: 3,
            explanation:
              "应先确认事实来源和影响范围，再修正关系并保留现场证据、变更原因及历史有效期。",
            optionNotes: [
              "直接改字段可能掩盖线路、接入点或用户关系问题。",
              "计量箱、客户和拓扑是不同关系，不能只改一层。",
              "删除重建会丢失历史，也无法解释既有业务。",
              "正确答案：先核实、再修正、全程留痕。",
            ],
          },
        ],
        next: {
          number: "02",
          title: "电压、电流、功率、容量与负荷",
          text: "下一章会把“配变容量、CT变比、额定电流、计量倍率”这些现场参数讲清楚。",
        },
      },
      {
        id: "2",
        number: "02",
        title: "看懂现场电学量",
        subtitle: "电压、电流、功率、容量、负荷和互感器变比，分别回答什么业务问题",
        duration: "约 14 分钟",
        tags: ["电压电流", "容量负荷", "互感器"],
        objectives: [
          "区分电压、电流、功率、电量和容量的物理含义。",
          "解释视在功率、有功功率、功率因数和计量倍率。",
          "理解配变容量、开关额定电流与实际负荷不是同一个概念。",
          "识别现场读数与系统数据异常时应该先核对什么。",
        ],
        sections: [
          {
            id: "goals",
            short: "目标",
            title: "1. 本节学习目标",
            html: `
              <div class="metric-hero">
                <div><span>V</span><strong>电压</strong><p>推动电流的势差</p></div>
                <div><span>A</span><strong>电流</strong><p>电荷流动的快慢</p></div>
                <div><span>kW</span><strong>功率</strong><p>做功的快慢</p></div>
                <div><span>kWh</span><strong>电量</strong><p>一段时间累计</p></div>
                <div><span>kVA</span><strong>容量</strong><p>设备可承担的规模</p></div>
              </div>
              <div class="callout callout-green">
                <strong>学习目的</strong>
                <p>业务人员说“容量不够”“电流偏大”“变比不对”“功率因数低”，都是在描述不同的现场约束。研发需要知道它们各自影响什么数据、校验和业务判断。</p>
              </div>
            `,
          },
          {
            id: "background",
            short: "背景",
            title: "2. 业务背景",
            html: `
              <p>同一个计量箱页面会出现电压、开关电流规格、电能表参数、CT/PT变比和配变容量。它们不是可以互相替代的数值。</p>
              <div class="question-stack">
                <div><b>配变容量 400 kVA</b><span>说明设备配置能力，不说明当前实际带了多少负荷。</span></div>
                <div><b>开关额定电流 32 A</b><span>说明设备允许通过的电流等级，不是此刻的实测电流。</span></div>
                <div><b>电能表当前电流 8 A</b><span>表示抄读时刻的电流，可能随用电设备变化。</span></div>
                <div><b>本月电量 320 kWh</b><span>表示一段时间内累计使用的有功电能。</span></div>
              </div>
            `,
          },
          {
            id: "concepts",
            short: "概念",
            title: "3. 核心概念",
            html: `
              <div class="concept-list">
                <article>
                  <h3>电压</h3>
                  <p>电压描述电场中两点之间的电势差，通俗理解为推动电荷形成电流的“压力”。</p>
                  <p>现场常见“10 kV线路”“220/380 V低压用电”。具体高低压分类和设备允许范围应以现行标准及企业制度为准。</p>
                </article>
                <article>
                  <h3>电流</h3>
                  <p>电流描述单位时间内通过导体截面的电荷量。负载越多，电流通常会越大，但还受电压、接线方式和设备特性影响。</p>
                </article>
                <article>
                  <h3>有功功率与视在功率</h3>
                  <p><strong>有功功率</strong>表示真正转换为工作效果的部分，单位常用 kW；<strong>视在功率</strong>是电压与电流规模的综合量，单位常用 kVA。</p>
                  <p>交流系统存在电感、电容等特性，所以视在功率不一定全部转化为有功功率。</p>
                </article>
                <article>
                  <h3>功率因数</h3>
                  <p>功率因数可理解为有功功率占视在功率的比例。功率因数低时，同样的视在容量能提供的有功能力更少，线路和设备的利用效率也会受到影响。</p>
                </article>
                <article>
                  <h3>电量</h3>
                  <p>电量是功率在一段时间内的累计。常说的“一度电”就是 1 千瓦时，即 1 kW 持续 1 小时。</p>
                </article>
                <article>
                  <h3>容量与负荷</h3>
                  <p><strong>容量</strong>像设备的“承载上限和配置能力”；<strong>负荷</strong>像当前实际承担的用电规模。配变额定容量、报装容量、合同容量和实时负荷也可能采用不同业务口径。</p>
                </article>
              </div>
            `,
          },
          {
            id: "formulas",
            short: "公式",
            title: "4. 用三个关系记住现场量",
            html: `
              <div class="formula-grid">
                <div class="formula-card">
                  <span>单相有功功率</span>
                  <strong>P = U × I × cosφ</strong>
                  <p>P为有功功率，U为电压，I为电流，cosφ为功率因数。</p>
                </div>
                <div class="formula-card">
                  <span>三相有功功率</span>
                  <strong>P = √3 × U线 × I线 × cosφ</strong>
                  <p>用于常见三相对称交流场景；实际测量还应关注接线和不平衡情况。</p>
                </div>
                <div class="formula-card">
                  <span>一段时间电量</span>
                  <strong>E = P × t</strong>
                  <p>1 kWh 表示 1 kW 持续 1 小时。电能表累计的是电能。</p>
                </div>
              </div>
              <p>公式不是为了让研发替代现场计算，而是帮助我们判断字段之间是否可能矛盾。例如一个 7 kW、220 V、功率因数接近 1 的充电设备，工作电流约 32 A；如果页面却显示 6 A，就值得核对。</p>
              <div class="callout callout-amber">
                <strong>不要直接根据功率倒推唯一电流。</strong>
                <p>交流场景还要考虑功率因数、三相线电压/相电压和负荷不平衡；需要依据实际测量与现场接线判断。</p>
              </div>
            `,
          },
          {
            id: "ratios",
            short: "变比",
            title: "5. 互感器变比与计量倍率",
            html: `
              <p>高电压或大电流用户不能把全部电压、电流直接送入普通电能表，因此可能通过电压互感器（PT）和电流互感器（CT）转换后再进入计量装置。</p>
              <div class="ratio-visual">
                <div><span>一次侧</span><strong>现场高电压 / 大电流</strong></div>
                <i>互感器</i>
                <div><span>二次侧</span><strong>电能表可接受的小信号</strong></div>
              </div>
              <p>以 100/5 A 的电流互感器为例，变比是 20。一次侧通过 100 A 时，二次侧对应约 5 A；电能表看到的是缩小后的信号，业务计算时需要按正确倍率还原。</p>
              <div class="exception-box">
                <strong>变比错误的典型影响</strong>
                <ul>
                  <li>现场变比与档案不一致，电量放大或缩小，影响电费和线损。</li>
                  <li>只有一只表却关联了错误的互感器组合，或者三相组合不完整。</li>
                  <li>换表时只更新电能表编号，没有同步核对PT/CT、接线和倍率。</li>
                  <li>抄表读数直接作为结算电量，忽略倍率或表计用途。</li>
                </ul>
              </div>
            `,
          },
          {
            id: "process",
            short: "现场",
            title: "6. 从现场读数到业务结果",
            html: `
              <ol class="step-list">
                <li><b>识别计量方式</b><span>直接接入还是经互感器接入，单相还是三相，计量用途是什么。</span></li>
                <li><b>核对设备参数</b><span>表号、电压规格、电流规格、CT/PT变比、生产厂家和通信地址。</span></li>
                <li><b>观察现场状态</b><span>相别、接线、开关规格、封印、负载和异常现象。</span></li>
                <li><b>读取数据</b><span>电压、电流、功率、功率因数、电能示值和时间等。</span></li>
                <li><b>形成业务数据</b><span>采集数据进入主站，电量进入营销业务，异常进入核对或缺陷处理。</span></li>
              </ol>
              <div class="three-up">
                <div><strong>先看对象</strong><p>这是计量箱、表、互感器还是终端的数据？</p></div>
                <div><strong>再看口径</strong><p>是瞬时量、累计量、额定值还是配置值？</p></div>
                <div><strong>最后看关系</strong><p>表与计量点、互感器、客户和台区是否一致？</p></div>
              </div>
            `,
          },
          {
            id: "project-case",
            short: "项目案例",
            title: "7. 本地项目案例",
            html: `
              <div class="case-header">
                <div><span>案例来源</span><strong>设备主人巡视中的计量装置核对</strong></div>
                <div class="case-badge">本地项目观察</div>
              </div>
              <p>巡视页面会分别采集计量箱、电能表、互感器、采集终端和开关信息。以互感器为例，现场关注类别、位置、变比和照片；以电能表为例，现场关注资产编号、通信地址、接线方式、封印和照片。</p>
              <div class="scenario-card">
                <p class="panel-label">场景</p>
                <h3>一条“线损异常”线索</h3>
                <p>某台区可能出现用户用电正常、采集也正常，但台区线损模式异常的现象。排查时不能只盯总表与分表差额，还要核对用户表所属台区、计量倍率、接线方式、换表记录、互感器档案和采集数据质量。</p>
              </div>
              <div class="project-pair">
                <div><span>巡视应用的作用</span><p>把现场可观测的电压、电流、表号、变比、封印和设备状态形成结构化记录。</p></div>
                <div><span>营销/采集系统的作用</span><p>利用档案与测量数据计算电量、线损和业务结果，并对异常发起核查或整改。</p></div>
              </div>
            `,
          },
          {
            id: "software",
            short: "软件视角",
            title: "8. 软件研发视角",
            html: `
              <div class="guideline-grid">
                <div><span>字段</span><h3>带单位和口径</h3><p>电压V、电流A、有功kW、电量kWh、容量kVA不能只存数值。额定值、瞬时值、累计值也要分开。</p></div>
                <div><span>校验</span><h3>做区间与关系校验</h3><p>校验单位、量程、倍率、三相组合和状态，不只校验“必填”。</p></div>
                <div><span>展示</span><h3>解释异常而不是只标红</h3><p>提示异常对象、可能原因、数据时间与建议核对步骤。</p></div>
                <div><span>历史</span><h3>保存计量参数版本</h3><p>换表、改接线、变比维护必须保留生效时间，否则历史电量无法解释。</p></div>
              </div>
              <div class="code-card">
                <div class="code-title">接口设计示意</div>
                <pre><code>{
  "meteringPointId": "MP-001",
  "meterAssetId": "M-001",
  "wiringMode": "THREE_PHASE_FOUR_WIRE",
  "ratedVoltage": {"value": 380, "unit": "V"},
  "ratedCurrent": {"value": 5, "unit": "A"},
  "ctRatio": "100/5",
  "ptRatio": "10000/100",
  "measuredAt": "2026-11-10T08:30:00+08:00",
  "sourceSystem": "collection"
}</code></pre>
              </div>
              <div class="callout callout-amber">
                <strong>示意数据结构，不代表正式接口。</strong>
                <p>业务系统应通过版本和有效时间解释“测量时刻使用的是哪套参数”，尤其是换表和互感器变更前后。</p>
              </div>
            `,
          },
          {
            id: "summary",
            short: "总结",
            title: "9. 本节总结",
            html: `
              <div class="takeaway-list">
                <div><span>1</span><p>电压是势差，电流是流动，功率是变化快慢，电量是累计。</p></div>
                <div><span>2</span><p>额定容量、额定电流、报装容量和实时负荷是不同概念。</p></div>
                <div><span>3</span><p>交流功率判断需要考虑功率因数，不能只看电压乘电流。</p></div>
                <div><span>4</span><p>互感器变比把现场大信号转换为可计量的小信号，参数必须按时间管理。</p></div>
                <div><span>5</span><p>测量异常不能直接等同设备故障，要同时核对对象、口径、关系和时刻。</p></div>
              </div>
            `,
          },
        ],
        quiz: [
          {
            id: "q2-1",
            question: "配变铭牌“400 kVA”最准确的理解是什么？",
            options: [
              "当前正带 400 kW 有功负荷",
              "设备视在功率的额定能力，不等于当前实测负荷",
              "每小时一定产生 400 kWh 电量",
              "配变下每户的合同容量都是 400 kVA",
            ],
            correct: 1,
            explanation:
              "kVA表示视在功率能力；实际有功负荷还要看当前负荷和功率因数，单个用户容量也是独立业务参数。",
            optionNotes: [
              "kVA与kW口径不同，也不代表当前负荷。",
              "正确答案：额定能力与实际负荷是两个维度。",
              "电量需要功率与时间共同决定。",
              "配变容量不会自动等于每户合同容量。",
            ],
          },
          {
            id: "q2-2",
            question:
              "某用户经100/5 A的CT接入计量。说“电能表看到的5 A就等于现场一次侧只有5 A”，哪里不对？",
            options: [
              "没有不对，电能表读数就是一次电流",
              "CT只改变频率，不改变电流",
              "二次侧5 A要按20倍变比还原为约100 A的一次电流",
              "只要功率因数为1就不需要变比",
            ],
            correct: 2,
            explanation:
              "100/5的变比为20。二次侧是转换后的信号，业务计算需按有效变比和接线口径还原。",
            optionNotes: [
              "经互感器接入时，表计信号与一次量不同。",
              "CT的核心是电流变换，不是改变频率。",
              "正确答案：一次量约等于二次量乘电流变比。",
              "功率因数不影响电流互感器变比关系。",
            ],
          },
          {
            id: "q2-3",
            question: "系统发现某用户近几个月电量稳定偏低，最合理的排查顺序是什么？",
            options: [
              "直接判定窃电并关闭账户",
              "只让用户重新报一次用电地址",
              "先核对计量对象、倍率、接线、数据口径和变更历史，再结合现场核查",
              "只要电能表在线就不处理",
            ],
            correct: 2,
            explanation:
              "电量异常可能来自负荷变化、档案、倍率、接线、采集质量或现场问题，应先建立完整证据链。",
            optionNotes: [
              "不能在没有核实时直接作违法或违约判断。",
              "地址只是关系的一部分，无法解释电量口径。",
              "正确答案：从数据口径到设备关系逐层排除。",
              "在线只说明通信链路的一部分正常。",
            ],
          },
        ],
        next: {
          number: "03",
          title: "电网设备与拓扑关系",
          text: "下一章会把这些参数落到设备资产、连接边和业务关系上，解释空间拓扑为何容易与台账不一致。",
        },
      },
      {
        id: "3",
        number: "03",
        title: "设备、关系与拓扑",
        subtitle: "同一只计量箱，为什么要同时维护资产信息、物理挂接、台区归属和责任关系",
        duration: "约 15 分钟",
        tags: ["设备资产", "空间拓扑", "箱表关系"],
        objectives: [
          "理解电网设备资产、拓扑边和业务归属的区别。",
          "读懂从配变到台区、接入点、计量箱和电能表的关系链。",
          "分析设备归属台区与人员当前所在台区不一致的业务含义。",
          "用软件模型表达关系有效期、异常来源和历史追溯。",
        ],
        sections: [
          {
            id: "goals",
            short: "目标",
            title: "1. 本节学习目标",
            html: `
              <div class="objective-grid">
                <div class="objective-card"><span>01</span><p>区分“设备本体”和“设备之间的关系”。</p></div>
                <div class="objective-card"><span>02</span><p>看懂配变、低压台区、接入点和计量箱的挂接链。</p></div>
                <div class="objective-card"><span>03</span><p>识别拓扑、台账和业务归属不一致的异常。</p></div>
                <div class="objective-card"><span>04</span><p>设计带有效期、来源和历史的关系数据模型。</p></div>
              </div>
            `,
          },
          {
            id: "background",
            short: "背景",
            title: "2. 业务背景",
            html: `
              <p>本地空间拓扑页面有这样的业务动作：先查询变压器对应的低压台区，再在地图上选择接入点或上级设备，把计量箱“挂接”到正确位置。</p>
              <div class="conflict-banner">
                <div><span>人员位置</span><strong>A台区附近</strong></div>
                <div class="conflict-symbol">≠</div>
                <div><span>设备档案</span><strong>归属B台区</strong></div>
                <div class="conflict-symbol">→</div>
                <div><span>系统动作</span><strong>提示确认，而不是静默覆盖</strong></div>
              </div>
              <p>当扫描设备归属台区与人员当前所在台区不一致时，系统需要确认应该依据“设备归属”还是“当前所在位置”继续作业。这是拓扑与组织/现场位置冲突的典型业务场景。</p>
            `,
          },
          {
            id: "concepts",
            short: "概念",
            title: "3. 核心概念",
            html: `
              <div class="concept-list">
                <article>
                  <h3>设备资产</h3>
                  <p>描述一个现实设备“是什么、编号是什么、属于谁、处于什么状态、安装在哪个位置”。例如一台配电变压器、一只计量箱或一块电能表。</p>
                </article>
                <article>
                  <h3>拓扑关系</h3>
                  <p>描述设备之间“谁连接到谁”或“谁向谁供电”。拓扑通常应作为关系对象管理，而不是只存一个上级设备名称。</p>
                </article>
                <article>
                  <h3>接入点</h3>
                  <p>设备接入配电网络的业务/空间节点。项目中的计量箱可能需要挂接到已有接入点，也可能需要新建接入点并选择上级杆塔或分支箱开关。</p>
                </article>
                <article>
                  <h3>箱表关系</h3>
                  <p>电能表安装在哪个计量箱、哪个行列表位的关系。它帮助现场找到表，也约束箱内容量和资产核对。</p>
                </article>
                <article>
                  <h3>箱组</h3>
                  <p>多个计量箱形成的柜体组合或空间组合。箱组不是简单的“父设备”，还表达现场安装布置和批量维护关系。</p>
                </article>
                <article>
                  <h3>设备主人与责任范围</h3>
                  <p>谁对某台区或某类设备承担巡视、缺陷核查和维护责任。责任关系可能随组织调整、人员变更和区域划分变化。</p>
                </article>
              </div>
            `,
          },
          {
            id: "objects",
            short: "拓扑",
            title: "4. 从配变到电能表的关系链",
            html: `
              <div class="topology-deep">
                <div class="topology-node node-source"><span>上级网络</span><strong>配电线路</strong></div>
                <div class="topology-edge"><span>供电</span></div>
                <div class="topology-node node-transformer"><span>物理设备</span><strong>配电变压器</strong></div>
                <div class="topology-edge"><span>形成</span></div>
                <div class="topology-node node-area"><span>管理对象</span><strong>低压台区</strong></div>
                <div class="topology-branch">
                  <div>
                    <div class="topology-edge"><span>包含</span></div>
                    <div class="topology-node"><span>网络节点</span><strong>低压线路 / 接入点</strong></div>
                    <div class="topology-edge"><span>挂接</span></div>
                    <div class="topology-node node-box"><span>现场资产</span><strong>计量箱</strong></div>
                  </div>
                  <div>
                    <div class="topology-edge"><span>包含</span></div>
                    <div class="topology-node"><span>计量位置</span><strong>表位 / 计量点</strong></div>
                    <div class="topology-edge"><span>安装</span></div>
                    <div class="topology-node node-meter"><span>计量资产</span><strong>电能表</strong></div>
                  </div>
                </div>
              </div>
              <div class="callout callout-green">
                <strong>一条线不能装下所有含义。</strong>
                <p>“变压器→台区”偏管理和供电范围，“接入点→计量箱”偏物理挂接，“计量箱→表位→电能表”偏现场安装。三种关系相关，但存储和变更责任可能不同。</p>
              </div>
            `,
          },
          {
            id: "process",
            short: "流程",
            title: "5. 一次现场设备关系核对",
            html: `
              <p>结合设备主人巡视项目的页面顺序，可以抽象为：</p>
              <div class="inspection-flow">
                <div><span>01</span><strong>扫描箱或表</strong><p>识别设备编码和现场对象。</p></div>
                <div><span>02</span><strong>匹配台区</strong><p>核对当前位置与设备归属，处理冲突。</p></div>
                <div><span>03</span><strong>核对箱体</strong><p>外观、内部、地址、规格、材质和封印。</p></div>
                <div><span>04</span><strong>核对表与设备</strong><p>箱内电能表、互感器、终端、开关和下户线。</p></div>
                <div><span>05</span><strong>维护空间拓扑</strong><p>必要时挂接接入点或选择上级设备。</p></div>
                <div><span>06</span><strong>形成结果</strong><p>正常结果上传；隐患转整改；变更更新档案。</p></div>
              </div>
              <div class="exception-box">
                <strong>易错点</strong>
                <ul>
                  <li>人员站在A台区扫描，不代表箱一定属于A台区。</li>
                  <li>设备编号匹配，不代表物理挂接位置正确。</li>
                  <li>箱表关系存在，不代表客户和计量点关系完整。</li>
                  <li>一次现场作业完成，不代表档案、拓扑和采集关系已经同步。</li>
                </ul>
              </div>
            `,
          },
          {
            id: "project-case",
            short: "项目案例",
            title: "6. 本地项目案例",
            html: `
              <div class="case-header">
                <div><span>案例来源</span><strong>smart-patrol 空间拓扑关系维护</strong></div>
                <div class="case-badge">本地项目观察</div>
              </div>
              <p>页面先通过变压器找到低压台区，再选择接入点或上级设备，最后确认计量箱与节点的挂接。页面同时展示资产编号、接入点名称和接入点ID。</p>
              <div class="scenario-card">
                <p class="panel-label">真实问题</p>
                <h3>“箱就在这里，为什么还要确认归属？”</h3>
                <p>人员位置是现场作业坐标，设备归属是供电业务关系。箱体可能跨越台区边缘，也可能历史档案未更新。系统提示两种台区让人员确认，本质上是在防止用一个地点字段同时承担位置、归属和拓扑三种含义。</p>
              </div>
              <div class="three-up">
                <div><strong>计量箱建档</strong><p>回答箱是什么、箱内有哪些表、表位在哪里。</p></div>
                <div><strong>空间拓扑</strong><p>回答箱挂接到哪个网络节点、由谁供电。</p></div>
                <div><strong>设备主人巡视</strong><p>回答谁在什么工单和场景下核对现场、发现什么异常。</p></div>
              </div>
            `,
          },
          {
            id: "software",
            short: "软件视角",
            title: "7. 软件研发视角",
            html: `
              <p>推荐把拓扑和业务归属做成独立关系，并带有效期、来源和确认证据。</p>
              <div class="model-table">
                <div class="model-row model-head"><span>模型</span><span>关键内容</span><span>不能替代</span></div>
                <div class="model-row"><span>asset</span><span>设备ID、类型、编码、状态、产权、安装位置</span><span>拓扑边</span></div>
                <div class="model-row"><span>topology_edge</span><span>起点、终点、关系类型、来源、生效/失效时间</span><span>设备台账</span></div>
                <div class="model-row"><span>installation</span><span>箱、表位、电能表、安装时间和拆除时间</span><span>客户关系</span></div>
                <div class="model-row"><span>service_assignment</span><span>客户、供电点、计量点、台区、有效期</span><span>物理拓扑</span></div>
                <div class="model-row"><span>site_check</span><span>工单、位置、对象、检查结果、证据和确认人</span><span>最终档案</span></div>
              </div>
              <div class="guideline-grid">
                <div><span>设计原则 01</span><h3>资产身份稳定</h3><p>设备迁移或换装不应重建设备身份，而应关闭旧关系、创建新关系。</p></div>
                <div><span>设计原则 02</span><h3>关系单独成对象</h3><p>关系有来源、有效期、变更原因和审核人，才能解释历史。</p></div>
                <div><span>设计原则 03</span><h3>冲突显式呈现</h3><p>不自动选择权威值，先展示“设备归属、当前位置、档案关系”的冲突。</p></div>
                <div><span>设计原则 04</span><h3>更新可追溯</h3><p>现场核对、人工修正和外部同步都要保留来源与证据。</p></div>
              </div>
              <div class="callout callout-amber">
                <strong>权限也要分层。</strong>
                <p>能查看一只表、能修改计量箱档案、能调整拓扑关系、能确认设备归属，可能是四种不同权限。组织范围、设备责任范围和现场任务范围也不应混为一个字段。</p>
              </div>
            `,
          },
          {
            id: "summary",
            short: "总结",
            title: "8. 本节总结",
            html: `
              <div class="takeaway-list">
                <div><span>1</span><p>设备资产回答“是什么”，拓扑关系回答“连到哪”。</p></div>
                <div><span>2</span><p>配变、台区、接入点、计量箱和电能表处在不同业务层次。</p></div>
                <div><span>3</span><p>人员位置、设备归属和档案归属可能冲突，应显式核实。</p></div>
                <div><span>4</span><p>箱表关系、客户关系和空间拓扑必须分别建模。</p></div>
                <div><span>5</span><p>关系变更需要有效期、来源、证据和审核，不能只覆盖当前值。</p></div>
              </div>
            `,
          },
        ],
        quiz: [
          {
            id: "q3-1",
            question: "以下哪项最接近“拓扑关系”的业务含义？",
            options: [
              "计量箱的材质和生产厂家",
              "计量箱挂接到哪个接入点、由哪条供电链路供电",
              "电能表当前是否在线采集",
              "设备主人的手机号码",
            ],
            correct: 1,
            explanation:
              "拓扑关系描述设备节点之间的连接或供电关系，而不是设备属性或人员联系信息。",
            optionNotes: [
              "材质和厂家属于设备属性。",
              "正确答案：拓扑回答“连接到谁、怎样供电”。",
              "在线状态属于运行或通信状态。",
              "人员联系信息属于组织或人员数据。",
            ],
          },
          {
            id: "q3-2",
            question:
              "人员站在A台区扫描设备，但设备档案显示归属B台区。系统提示确认，比直接改成A更合理的业务原因是什么？",
            options: [
              "人员位置一定代表设备永久归属",
              "扫描到的条码一定属于错误设备",
              "人员位置属于现场位置，设备归属属于供电业务关系，需要核实",
              "台区只用于地图展示，不影响任何业务",
            ],
            correct: 2,
            explanation:
              "当前位置和业务归属是不同事实。A台区附近也可能存在跨区设备或历史档案未更新，必须用现场和档案证据确认。",
            optionNotes: [
              "人员位置不能自动决定设备供电归属。",
              "条码是否错误也需要核对，不能预设。",
              "正确答案：事实维度不同，应显式确认。",
              "台区会影响归属、巡视、线损和管理范围等业务。",
            ],
          },
          {
            id: "q3-3",
            question: "一只电能表从1号表位更换到2号表位，较好的数据设计是什么？",
            options: [
              "直接覆盖表位上原来的表号，不保留记录",
              "删除该电能表资产，再新建一个新设备",
              "结束旧安装关系，创建新安装关系并保留时间和原因",
              "只修改客户地址，表位关系无关紧要",
            ],
            correct: 2,
            explanation:
              "设备身份与安装关系应分离。通过关闭旧关系、创建新关系，可以保留设备生命周期和现场历史。",
            optionNotes: [
              "覆盖会丢失历史，无法解释旧表位数据。",
              "设备本体没有消失，删除资产会破坏连续性。",
              "正确答案：关系有时间段，资产身份保持稳定。",
              "表位会直接影响现场定位和箱表核对。",
            ],
          },
        ],
        next: {
          number: "04",
          title: "配电网与台区",
          text: "后续将深入台区划分、低压拓扑、线损归属和台区经理责任范围。当前版本先学习到这里。",
        },
      },
    ],
  };
})(typeof window !== "undefined" ? window : globalThis);
