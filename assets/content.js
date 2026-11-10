(function attachCourseContent(root) {
  "use strict";

  root.GRID_COURSE = {
    meta: {
      title: "国家电网业务知识体系",
      stage: "基础电力业务",
      version: "v2.0",
      updatedAt: "2026-11-10",
    },
    chapters: [
      {
        id: "1",
        number: "01",
        title: "从发电到用电",
        subtitle: "先看懂电能怎样到客户，再理解营销、计量、采集、运检和现场作业各自解决什么问题",
        duration: "约 15 分钟",
        tags: ["电力系统", "营销运检", "现场业务"],
        objectives: [
          "用自己的话说明电力从生产到客户使用的主要过程。",
          "说清营销服务、计量采集、设备运检和现场作业的业务分工。",
          "理解计量箱、台区、电能表和客户在现实电网中的位置。",
          "知道项目任务为什么会跨部门、跨系统协作，以及异常会影响什么。",
        ],
        sections: [
          {
            id: "goals",
            short: "目标",
            title: "1. 本节学习目标",
            html: `
              <div class="objective-grid">
                <div class="objective-card"><span>01</span><p>能读懂“发—输—变—配—用”这条电力主线。</p></div>
                <div class="objective-card"><span>02</span><p>知道营销、运检、计量和采集分别负责什么。</p></div>
                <div class="objective-card"><span>03</span><p>能从现场设备联想到客户服务与后续业务。</p></div>
                <div class="objective-card"><span>04</span><p>能把计量箱、巡视和缺陷项目放回完整业务脉络中。</p></div>
              </div>
              <div class="callout callout-green">
                <strong>为什么先学这一章？</strong>
                <p>研发如果只记住页面名称，很容易把业务理解成“填表、提交、审核”。真正熟悉业务，需要知道这项工作在现场解决什么问题、谁会使用结果、出错后会影响谁。</p>
              </div>
            `,
          },
          {
            id: "background",
            short: "背景",
            title: "2. 业务背景",
            html: `
              <p>假设一个计量箱建档页面同时显示：台区名称、配变名称、计量箱编号、电能表编号、用电地址和客户名称。页面能够提交，业务结果却不一定可靠。</p>
              <div class="split-panel">
                <div class="panel panel-paper">
                  <p class="panel-label">研发看到的</p>
                  <h3>一条能提交的数据</h3>
                  <p>表单校验通过，系统提示成功，页面显示“建档完成”。</p>
                </div>
                <div class="panel panel-mint">
                  <p class="panel-label">现场关心的</p>
                  <h3>一条真实可追溯的关系</h3>
                  <p>箱子由哪台配变供电、箱内装了几只表、表对应哪个客户、换表后旧数据如何衔接。</p>
                </div>
              </div>
              <p>系统表面上管理一条条信息，业务上管理的是<strong>现实设备、客户关系、现场活动和责任结果</strong>。理解这四层，才能听懂业务人员为什么要求某些信息必须现场确认。</p>
              <div class="callout callout-green">
                <strong>先把“建档”说清楚</strong>
                <p>建档就是给现场设备和业务关系建立可用的业务资料：这是什么设备、在哪里、由哪个台区供电、箱和表怎样对应、属于谁、现场照片是什么。建档完成不等于后续永远正确，它只是后续计量、营销、巡视和服务的基础。</p>
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
                  <p>“台区”的具体边界、编码和管理口径存在标准与省公司实现差异。业务上通常同时关心：谁供电、包含哪些低压设施、范围内有哪些用户、由谁负责管理。</p>
                </article>
                <article>
                  <h3>营销服务</h3>
                  <p>营销业务面对客户，关注客户申请接电、用电变更、抄表计费、用电检查和客户服务。研发看到的工单，往往只是客户服务过程的一部分。</p>
                </article>
                <article>
                  <h3>设备运检</h3>
                  <p>设备运检面对电网设施，关注设备是否存在、运行是否正常、谁负责巡视、发现缺陷后如何检修和验收。</p>
                </article>
                <article>
                  <h3>计量与采集</h3>
                  <p>计量解决“在哪里计量、怎么保证量得准”；采集解决“现场数据怎样及时传回系统”。二者共同为电量、电费、线损和设备状态判断提供依据。</p>
                </article>
                <article>
                  <h3>调度与运行</h3>
                  <p>调度关注电网整体的供需平衡、运行方式和故障处置；现场人员则负责执行设备巡视、操作、检修和应急处置。研发通常看不到调度过程，但它影响停电、复电和设备运行状态。</p>
                </article>
              </div>
              <div class="photo-process-grid">
                <figure class="photo-process-card">
                  <img src="./assets/images/real/transmission-lines.jpg" alt="高压变电站、输电杆塔和线路实拍" loading="lazy" />
                  <figcaption><span>01 · 输电</span><strong>高电压、长距离输送电能</strong><a href="https://commons.wikimedia.org/wiki/File:Power_Transmission_Lines.jpg" target="_blank" rel="noreferrer">照片：Orlova-tpe / CC BY-SA 3.0</a></figcaption>
                </figure>
                <figure class="photo-process-card">
                  <img src="./assets/images/real/distribution-transformer.jpg" alt="杆上配电变压器和低压线路实拍" loading="lazy" />
                  <figcaption><span>02 · 配电</span><strong>配变降压后送到台区和客户</strong><a href="https://commons.wikimedia.org/wiki/File:Utility_pole_with_transformer_and_power_lines.jpg" target="_blank" rel="noreferrer">照片：Candeadly / CC BY 4.0</a></figcaption>
                </figure>
                <figure class="photo-process-card">
                  <img src="./assets/images/real/smart-meter.jpg" alt="客户侧智能电能表实拍" loading="lazy" />
                  <figcaption><span>03 · 用电</span><strong>客户使用电能，计量装置记录电量</strong><a href="https://commons.wikimedia.org/wiki/File:Smart_Electrical_Meter.jpg" target="_blank" rel="noreferrer">照片：Aliva Sahoo / CC BY-SA 4.0</a></figcaption>
                </figure>
              </div>
              <div class="process-lanes photo-business-lanes">
                <div><span>客户服务</span><p>客户申请接电、变更用电并获得服务。</p></div>
                <div><span>计量采集</span><p>现场测量电能并把数据传回系统。</p></div>
                <div><span>设备运检</span><p>维护线路和设备，处理故障和缺陷。</p></div>
              </div>
              <div class="term-compare">
                <div><strong>现场有什么</strong><span>设备、箱体、表计和接线</span></div>
                <div><strong>现场怎样连接</strong><span>由哪条线路、哪台配变供电</span></div>
                <div><strong>业务上意味着什么</strong><span>谁使用、谁计量、谁负责</span></div>
              </div>
            `,
          },
          {
            id: "objects",
            short: "对象",
            title: "4. 业务对象及关系",
            html: `
              <p>下面是一条常见的低压居民供电路径，用于建立空间感。它不是所有用户都采用的唯一结构。</p>
              <div class="photo-topology-row">
                <figure><img src="./assets/images/real/switchgear.jpg" alt="配电变电站开关设备区域实拍" loading="lazy" /><figcaption>变电站 / 开关设备</figcaption></figure>
                <span aria-hidden="true">→</span>
                <figure><img src="./assets/images/real/distribution-transformer.jpg" alt="杆上配电变压器实拍" loading="lazy" /><figcaption>配变 / 台区</figcaption></figure>
                <span aria-hidden="true">→</span>
                <figure><img src="./assets/images/real/meter-cabinet.jpg" alt="户外计量表箱实拍" loading="lazy" /><figcaption>计量箱 / 客户</figcaption></figure>
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
              <div class="plain-term-grid">
                <div><b>供电点</b><span>电能实际送到的地方。例如一套住宅、一个店铺或一座厂房。</span></div>
                <div><b>计量点</b><span>业务上确认“从哪里计量电量”的位置，通常对应一只或多只计量表计。</span></div>
                <div><b>计量箱</b><span>现场安装电能表、开关、互感器和接线等设备的箱体。</span></div>
                <div><b>表位</b><span>计量箱里的具体安装位置，例如第 1 行第 2 列。</span></div>
              </div>
              <div class="callout callout-amber">
                <strong>关系不是永久写死的一对一。</strong>
                <p>台区可包含多个客户；一个客户可有多个供电点；一个计量箱可装多只电能表；一只电能表在生命周期内也可能先后关联不同计量点。</p>
              </div>
              <div class="business-role-grid">
                <div><span>调度 / 运行</span><strong>电能不能安全平衡地送出去</strong><p>关注运行方式、停电范围和故障处置。</p></div>
                <div><span>营销</span><strong>客户怎样获得和使用供电服务</strong><p>关注申请、计费、用电变更和服务结果。</p></div>
                <div><span>运检</span><strong>设备能否持续健康运行</strong><p>关注设备主人、巡视、检修和缺陷。</p></div>
                <div><span>计量采集</span><strong>用电量能否准确记录并传回</strong><p>关注表计、接线、倍率、通信和数据质量。</p></div>
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
                <li><b>业务建档</b><span>明确客户在哪里用电、在哪里计量、由哪个台区供电，以及现场有哪些设备。</span></li>
                <li><b>采集接入</b><span>电能表、终端、通信和主站形成数据链路。</span></li>
                <li><b>持续运营</b><span>形成电量、电费、巡视、缺陷整改、换表和销户等后续业务。</span></li>
              </ol>
              <div class="outcome-row">
                <div><strong>客户结果</strong><span>能够正常、安全用电</span></div>
                <div><strong>计量结果</strong><span>用电量可以准确记录</span></div>
                <div><strong>管理结果</strong><span>设备归属和责任范围清楚</span></div>
                <div><strong>服务结果</strong><span>后续变更、故障和缴费可办理</span></div>
              </div>
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
            short: "场景预览",
            title: "6. 基础业务场景小预览",
            html: `
              <div class="case-header">
                <div><span>场景</span><strong>一户低压居民从申请用电到持续用电</strong></div>
                <div class="case-badge">基础业务</div>
              </div>
              <p>先不展开具体系统功能，只观察一项客户业务如何同时连接客户、电网、计量和后续服务。</p>
              <div class="project-scene-list">
                <article>
                  <span>01 · 客户需求</span>
                  <h3>客户需要用电</h3>
                  <p>客户提出用电地址和容量需求，供电企业需要判断附近是否有合适的电源和供电条件。</p>
                  <strong>业务结果：形成客户办电任务。</strong>
                </article>
                <article>
                  <span>02 · 供电关系</span>
                  <h3>电从哪里接到客户</h3>
                  <p>现场勘察后确定配电线路、配变、低压接入、计量位置和施工方式。</p>
                  <strong>业务结果：客户接入方案能够落地。</strong>
                </article>
                <article>
                  <span>03 · 持续服务</span>
                  <h3>用电以后还要继续管理</h3>
                  <p>装表接电后，还需要采集数据、计量电量、处理换表和故障，并持续维护设备关系。</p>
                  <strong>业务结果：客户用电进入持续运营阶段。</strong>
                </article>
              </div>
              <div class="callout callout-amber">
                <strong>这里只建立基础理解。</strong>
                <p>设备主人、计量箱建档、现场巡视、空间拓扑和缺陷整改都是后续专业应用课程。学习路线会先完成基础业务和现场作业平台，再进入这些具体项目。</p>
              </div>
            `,
          },
          {
            id: "field-business",
            short: "业务词卡",
            title: "7. 研发常听到的基础业务词",
            html: `
              <p>这些词经常出现在需求讨论中，研发不需要成为电力专业人员，但要知道它们对应的现场现象和业务影响。</p>
              <div class="basic-business-cards">
                <article><span>供电可靠性</span><strong>客户能不能持续有电</strong><p>停电时长、次数和影响范围，是可靠性、服务质量和运维工作的共同关注点。</p></article>
                <article><span>供电半径</span><strong>电能从电源送到用户的距离</strong><p>半径过长可能带来线路损耗、末端电压偏低和运维困难，策划接入方案时要综合考虑。</p></article>
                <article><span>电压质量</span><strong>电压是否保持在合理范围</strong><p>偏高、偏低或某相异常都可能影响设备正常使用，需要区分电源、线路、接线和计量问题。</p></article>
                <article><span>停电与复电</span><strong>为什么没电、何时恢复</strong><p>计划检修、临时故障、限电或客户内部故障的处理路径不同，不能只用一个“停电”状态概括。</p></article>
                <article><span>报装容量</span><strong>客户计划申请多大用电能力</strong><p>报装容量影响供电方案、设备选型和后续客户服务，但不等同于当前实际负荷。</p></article>
                <article><span>产权分界点</span><strong>双方设备在哪里交接责任</strong><p>分界点关系到哪些设备由供电企业负责、哪些由客户负责，是现场判断责任的重要依据。</p></article>
              </div>
              <div class="callout callout-green">
                <strong>研发判断提示</strong>
                <p>业务人员说“没电”时，不要马上把它理解成一个技术故障。它可能是计划停电、故障停电、客户内部故障、欠费停电、表计失压或采集异常。先问清对象、范围和持续时间。</p>
              </div>
            `,
          },
          {
            id: "software",
            short: "业务理解",
            title: "8. 研发如何真正听懂业务",
            html: `
              <p>研发不需要先背数据库或接口，而要先学会把业务人员的一句话还原成现场场景。可以使用下面“五问法”：</p>
              <div class="business-question-grid">
                <article><span>01</span><h3>对象是谁？</h3><p>他说的是客户、供电点、计量箱、电能表、互感器，还是某张工单？</p></article>
                <article><span>02</span><h3>现场在哪里？</h3><p>设备位于哪个台区、楼栋或线路下，人员现在是否真的到了现场？</p></article>
                <article><span>03</span><h3>关系对不对？</h3><p>这台配变是否真的给这个台区供电，这只表是否真的属于这个客户和表位？</p></article>
                <article><span>04</span><h3>业务到哪一步？</h3><p>是在建档、巡视、发现缺陷、整改、验收，还是已经归档？</p></article>
                <article><span>05</span><h3>出错影响谁？</h3><p>会影响客户用电、电量计费、设备责任、线损分析，还是后续现场作业？</p></article>
              </div>
              <div class="business-example">
                <p class="panel-label">用五问法拆一句话</p>
                <blockquote>“这个箱子建档了，但表没采集到，今天巡视先把它整改掉。”</blockquote>
                <div>
                  <p><strong>对象：</strong>计量箱、电能表、采集终端。</p>
                  <p><strong>关系：</strong>箱—表—台区—客户是否一致。</p>
                  <p><strong>状态：</strong>已建档不代表已正确接入采集，也不代表缺陷已经整改完成。</p>
                  <p><strong>影响：</strong>采集不到会影响数据回传，后续可能影响电量和现场核查。</p>
                  <p><strong>责任人：</strong>需要判断是建档人员、设备主人、采集运维还是整改人员处理。</p>
                </div>
              </div>
              <div class="callout callout-green">
                <strong>业务理解的目标不是会复述术语。</strong>
                <p>而是能够向业务人员解释：这个对象在现场起什么作用、当前流程为什么需要这一步、如果结果错误会影响谁、下一步应该找谁处理。</p>
              </div>
            `,
          },
          {
            id: "summary",
            short: "总结",
            title: "9. 本节总结",
            html: `
              <div class="takeaway-list">
                <div><span>1</span><p>电力业务建立在真实电网上，页面只是现场业务的入口。</p></div>
                <div><span>2</span><p>营销服务、设备运检、计量采集和调度运行关注不同业务结果。</p></div>
                <div><span>3</span><p>配变是设备，台区是围绕供电范围形成的管理对象。</p></div>
                <div><span>4</span><p>计量箱建档、巡视和缺陷整改共同维护现场关系与证据。</p></div>
                <div><span>5</span><p>理解业务要能回答对象、位置、关系、步骤和影响五个问题。</p></div>
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
            question: "关于台区，哪种理解最符合现场业务？",
            options: [
              "台区就是一台配电变压器",
              "台区就是供电所这个组织",
              "台区是围绕配变及低压供电范围形成的管理和服务对象，具体边界需结合业务口径",
              "台区就是客户所在的行政区",
            ],
            correct: 2,
            explanation:
              "配变是核心设备，台区还包含低压供电设施、范围内用户和管理关系；具体定义与省公司实现有关。",
            optionNotes: [
              "配变只是台区的核心设备之一。",
              "组织机构与供电管理对象不是同一维度。",
              "正确答案：台区同时包含供电设施、范围、用户和管理关系。",
              "供电范围可以跨越行政边界，不能简单等同。",
            ],
          },
          {
            id: "q1-3",
            question:
              "现场发现计量箱实际由A号配变供电，但系统档案挂在B号台区。较合理的处理方式是什么？",
            options: [
              "直接把系统里的台区改成A，不需要核实其他关系",
              "只修改客户归属，不处理计量箱和拓扑",
              "删除原计量箱记录，重新建立一个没有历史的箱",
              "核对现场接线、档案来源和影响范围，先取证再由责任人员修正",
            ],
            correct: 3,
            explanation:
              "应先确认事实来源和影响范围，由现场与业务责任人员共同确认后再修正，并保留现场证据与处理记录。",
            optionNotes: [
              "直接改记录可能掩盖线路、接入点或用户关系问题。",
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
        subtitle: "从铭牌、负荷、相别和计量倍率理解现场人员在核对什么",
        duration: "约 16 分钟",
        tags: ["设备铭牌", "容量负荷", "互感器"],
        objectives: [
          "区分电压、电流、功率、电量和容量的业务含义。",
          "看懂电能表铭牌和互感器变比在计量中的作用。",
          "理解配变容量、合同容量、额定电流和实时负荷不是同一件事。",
          "遇到电量、采集或设备异常时，知道应先核对哪些现场事实。",
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
                <p>业务人员说“容量不够”“电流偏大”“变比不对”“功率因数低”，描述的是不同现场约束。研发需要知道这些现象会影响谁、需要找谁核实，以及可能引出什么后续业务。</p>
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
                  <p><strong>现场解释：</strong>居民熟悉的照明和普通插座通常是单相 220V；工业电机和较大功率动力设备常见三相 380V。具体高低压分类和设备允许范围应以现行标准及企业制度为准。</p>
                </article>
                <article>
                  <h3>电流</h3>
                  <p>电流描述单位时间内通过导体截面的电荷量。负载越多，电流通常会越大，但还受电压、接线方式和设备特性影响。</p>
                </article>
                <article>
                  <h3>有功功率与视在功率</h3>
                  <p><strong>有功功率</strong>表示真正转换为工作效果的部分，单位常用 kW；<strong>视在功率</strong>是电压与电流规模的综合量，单位常用 kVA。</p>
                  <p><strong>简单类比：</strong>视在功率像设备占用的总容量，有功功率才像真正完成工作、产生效果的那一部分。</p>
                  <p>交流系统存在电感、电容等特性，所以视在功率不一定全部转化为有功功率。</p>
                </article>
                <article>
                  <h3>功率因数</h3>
                  <p>功率因数可理解为有功功率占视在功率的比例。功率因数低时，同样的视在容量能提供的有功能力更少，线路和设备的利用效率也会受到影响。</p>
                  <p><strong>业务理解：</strong>不是“电表不转”或“客户不用电”，而是设备占用了一部分容量，却没有全部转化为有效工作。</p>
                </article>
                <article>
                  <h3>电量</h3>
                  <p>电量是功率在一段时间内的累计。常说的“一度电”就是 1 千瓦时，即 1 kW 持续 1 小时。</p>
                </article>
                <article>
                  <h3>线损</h3>
                  <p><strong>简单理解：</strong>一个台区或线路送出去的电量，减去范围内用户实际计量到的电量，两者之间的差额通常会引起线损分析。</p>
                  <p>差额可能来自线路和变压器损耗，也可能受计量关系、表计故障、采集缺失、档案错误或窃电等问题影响。因此不能看到线损偏高就直接认定是线路老化。</p>
                </article>
                <article>
                  <h3>容量与负荷</h3>
                  <p><strong>容量</strong>像设备的“承载上限和配置能力”；<strong>负荷</strong>像当前实际承担的用电规模。配变额定容量、报装容量、合同容量和实时负荷也可能采用不同业务口径。</p>
                </article>
                <article>
                  <h3>相别与接线</h3>
                  <p><strong>单相 220V：</strong>通常由一根相线（L）和一根中性线（N）构成。家庭照明、电视、冰箱、普通插座和小功率家电最常见，可以简单理解为“家用电”。</p>
                  <p><strong>三相 380V：</strong>通常由三根相线（L1、L2、L3）和中性线构成。三根相线之间约为 380V，任一相线与中性线之间约为 220V，常用于电机、泵类、较大商业和工业动力设备。</p>
                  <p><strong>不能绝对化：</strong>住宅通常使用单相，但别墅、大功率家庭设备或小型商铺也可能申请三相；工厂里也会有 220V 照明和控制回路。判断供电条件不能只看“居民还是工业”，要结合供电方案、电能表铭牌和现场接线。</p>
                  <p><strong>业务提醒：</strong>看到某一相电压异常，不能直接判断为客户停电，也可能是某相缺压、接线异常、表计问题或采集问题。</p>
                </article>
                <article>
                  <h3>额定值、实时值与结算值</h3>
                  <p>设备铭牌上的电压、电流和容量是额定能力；采集页面的电压、电流和功率是某一时刻的测量值；电量是一段时间的累计结果。三者不能混着解释。</p>
                </article>
              </div>
              <div class="phase-photo-comparison">
                <figure>
                  <img src="./assets/images/real/smart-meter.jpg" alt="居民场景中的智能电能表实拍" loading="lazy" />
                  <figcaption><span>常见单相场景</span><strong>220V 居民电表</strong><p>普通家庭照明、插座和小功率家电常见单相供电。</p></figcaption>
                </figure>
                <figure>
                  <img src="./assets/images/real/switchgear.jpg" alt="工业配电场景中的开关设备和变压器实拍" loading="lazy" />
                  <figcaption><span>常见三相场景</span><strong>380V 动力配电设备</strong><p>电机、泵类和较大商业负荷常见三相供电。</p></figcaption>
                </figure>
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
              <p>公式不是为了让研发替代现场计算，而是帮助我们判断现场信息是否可能矛盾。例如一个 7 kW、220 V、功率因数接近 1 的充电设备，工作电流约 32 A；如果页面却显示 6 A，就值得核对。</p>
              <div class="callout callout-amber">
                <strong>不要直接根据功率倒推唯一电流。</strong>
                <p>交流场景还要考虑功率因数、三相线电压/相电压和负荷不平衡；需要依据实际测量与现场接线判断。</p>
              </div>
              <figure class="lesson-figure">
                <img src="./assets/images/real/meter-nameplate.jpg" alt="电能表实物铭牌和显示屏照片" loading="lazy" />
                <figcaption>图 2-2　真实电能表铭牌示例。型号、电压、电流和常数会因厂家、用途而不同，现场必须核对表号和铭牌参数。</figcaption>
              </figure>
              <div class="field-reading-list">
                <div><b>220V 常见于单相</b><span>家用电表多见一根相线和一根中性线，适用于普通家庭和小功率设备。</span></div>
                <div><b>380V 常见于三相</b><span>工业电机和较大动力负荷多为三根相线；不是所有 380V 场合都没有 220V。</span></div>
                <div><b>再看电流</b><span>5(60)A 是基本与最大电流能力，不是家庭此刻正在使用的电流。</span></div>
                <div><b>核对表号</b><span>确认眼前这只表是不是业务要找的表。</span></div>
              </div>
            `,
          },
          {
            id: "ratios",
            short: "变比",
            title: "5. 互感器变比与计量倍率",
            html: `
              <p>高电压或大电流用户不能把全部电压、电流直接送入普通电能表，因此可能通过互感器转换后再进入计量装置。</p>
              <div class="plain-term-grid">
                <div><b>CT（电流互感器）</b><span>把现场大电流按比例缩小给电能表。例如 100A 缩小成 5A。</span></div>
                <div><b>PT（电压互感器）</b><span>把现场高电压按比例降低给电能表，避免高压直接进入表计。</span></div>
                <div><b>一次侧</b><span>可以理解为现场原来那一侧，即高电压或大电流侧。</span></div>
                <div><b>二次侧</b><span>可以理解为送入电能表的那一侧，是缩小后的电压或电流信号。</span></div>
              </div>
              <div class="ratio-visual">
                <div><span>一次侧</span><strong>现场高电压 / 大电流</strong></div>
                <i>互感器</i>
                <div><span>二次侧</span><strong>电能表可接受的小信号</strong></div>
              </div>
              <p>以 100/5 A 的电流互感器为例，变比是 20。一次侧通过 100 A 时，二次侧对应约 5 A；电能表看到的是缩小后的信号，业务计算时需要按正确倍率还原。</p>
              <div class="callout callout-green">
                <strong>“计量倍率”怎么理解</strong>
                <p>互感器把现场的大信号缩小后交给电表，业务上计算实际电量时，需要把这部分缩小比例还原，不能直接把表上看到的数字当成最终电量。</p>
              </div>
              <figure class="lesson-figure">
                <img src="./assets/images/real/meter-cabinet.jpg" alt="户外杆装计量表箱及多只电能表实拍" loading="lazy" />
                <figcaption>图 2-3　户外计量表箱实拍。真实表箱可能包含进线、开关、表计、互感器、终端和封印，具体布置因设备和地区而异。</figcaption>
              </figure>
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
              <p>巡视页面会分别核对计量箱、电能表、互感器、采集终端和开关。以互感器为例，现场关注它是哪一类、装在哪里、变比是多少；以电能表为例，现场关注表号、接线、封印和运行状态。</p>
              <div class="scenario-card">
                <p class="panel-label">场景</p>
                <h3>一条“线损异常”线索</h3>
                <p>某台区可能出现用户用电正常、采集也正常，但台区线损模式异常的现象。排查时不能只盯总表与分表差额，还要核对用户表所属台区、计量倍率、接线方式、换表记录、互感器档案和采集数据质量。</p>
              </div>
              <h3>项目里的典型判断</h3>
              <div class="business-cause-grid">
                <div><span>电量突然变小</span><strong>先排除负荷变化</strong><p>再看换表、倍率、接线、采集完整性和现场用电情况。</p></div>
                <div><span>某相电压为 0</span><strong>先确认停的是哪一相</strong><p>可能是外部停电、缺相、表计接线或采集问题，不能只凭一个读数下结论。</p></div>
                <div><span>电流超过开关额定值</span><strong>判断是否长期超载</strong><p>瞬时启动电流、实际负荷和设备能力要分开理解。</p></div>
                <div><span>采集在线但电量异常</span><strong>不要等同计量正确</strong><p>在线说明通信链路部分正常，仍需核对接线、倍率、表计状态和时间口径。</p></div>
              </div>
              <div class="project-pair">
                <div><span>巡视应用的作用</span><p>让设备主人到现场核对、取证和发现问题，并把异常交给后续业务处理。</p></div>
                <div><span>营销/采集业务的作用</span><p>用现场资料和测量结果形成电量、费用、线损或异常处理结论。</p></div>
              </div>
            `,
          },
          {
            id: "software",
            short: "现场判断",
            title: "8. 研发怎样解读现场异常",
            html: `
              <p>研发看到异常提示时，最有价值的能力不是立刻判断“哪段程序错了”，而是先还原业务场景。</p>
              <div class="diagnosis-ladder">
                <div><span>第 1 层</span><strong>现象是什么</strong><p>无电压、电流偏大、电量偏低、采集失败、表号不一致，还是现场照片缺失？</p></div>
                <div><span>第 2 层</span><strong>哪一个对象</strong><p>问题发生在客户、计量箱、电能表、互感器、终端、开关还是供电线路？</p></div>
                <div><span>第 3 层</span><strong>影响什么业务</strong><p>影响客户正常用电、电费结算、线损分析、设备责任认定，还是巡视归档？</p></div>
                <div><span>第 4 层</span><strong>现场是否确认</strong><p>异常是否有照片、表号、定位、测量值或现场人员说明作为证据？</p></div>
                <div><span>第 5 层</span><strong>下一步交给谁</strong><p>继续观察、现场补抄、换表、采集运维、缺陷整改、档案核对还是客户答复？</p></div>
              </div>
              <div class="callout callout-amber">
                <strong>现场异常不是“一个红点”。</strong>
                <p>同样是电量为零，原因可能是客户没有用电、停电、表计故障、接线错误、采集缺失或业务关系挂错。研发应推动页面把“现象、对象、时间、证据、状态和建议下一步”讲清楚。</p>
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
                <div><span>4</span><p>互感器变比把现场大信号转换为可计量的小信号，影响电量与线损判断。</p></div>
                <div><span>5</span><p>测量异常不能直接等同设备故障，要同时核对对象、关系、时间和现场证据。</p></div>
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
          title: "配电网、台区与设备基础",
          text: "下一章会把这些参数落到现场设备和供电关系上，解释为什么现场、档案和责任归属会出现不一致。",
        },
      },
      {
        id: "3",
        number: "03",
        title: "配电网、台区与设备基础",
        subtitle: "看懂线路、配变、台区、接入点、计量箱和客户之间的供电关系",
        duration: "约 16 分钟",
        tags: ["设备识别", "供电拓扑", "业务关系"],
        objectives: [
          "认识配电网现场常见设备及其基本作用。",
          "读懂从配电线路、配变、台区、接入点到计量箱和客户的供电关系。",
          "理解物理位置、供电归属和客户关系为什么需要分别确认。",
          "能用关系链分析一个新系统页面涉及的是哪一类业务对象。",
        ],
        sections: [
          {
            id: "goals",
            short: "目标",
            title: "1. 本节学习目标",
            html: `
              <div class="objective-grid">
                <div class="objective-card"><span>01</span><p>看到设备外形和位置，能说出它大致承担什么作用。</p></div>
                <div class="objective-card"><span>02</span><p>看懂配变、低压台区、接入点和计量箱的供电关系。</p></div>
                <div class="objective-card"><span>03</span><p>能区分现场位置、供电归属和客户使用关系。</p></div>
                <div class="objective-card"><span>04</span><p>能用“从哪来、归哪管、怎么计量”阅读业务页面。</p></div>
              </div>
            `,
          },
          {
            id: "background",
            short: "背景",
            title: "2. 业务背景",
            html: `
              <p>假设现场人员发现一只计量箱，系统档案显示它属于 A 台区，但同行人员认为它就在 B 台区附近。仅凭“站的位置”无法得到结论，需要继续核实现场供电线路、配变和上级接入设备。</p>
              <div class="conflict-banner">
                <div><span>人员位置</span><strong>A台区附近</strong></div>
                <div class="conflict-symbol">≠</div>
                <div><span>设备档案</span><strong>归属B台区</strong></div>
                <div class="conflict-symbol">→</div>
                <div><span>系统动作</span><strong>提示确认，而不是静默覆盖</strong></div>
              </div>
              <p>当扫描设备的归属台区与人员当前所在台区不一致时，系统需要确认应该依据“设备归属”还是“当前所在位置”继续作业。这体现的是同一个设备可能同时涉及物理位置、供电归属、管理责任和作业任务。</p>
            `,
          },
          {
            id: "concepts",
            short: "概念",
            title: "3. 核心概念",
            html: `
              <div class="concept-list">
                <article>
                  <h3>配电线路与馈线</h3>
                  <p>配电线路负责把电能从变电站或上级电源送到配变和用户附近。业务人员所说的“馈线”，可以简单理解为从变电站引出一条、专门向一片区域供电的中压线路。</p>
                  <p>“这条线跳闸”“这条线下面有故障”，通常是在描述一个停电影响范围或设备责任范围。</p>
                </article>
                <article>
                  <h3>供电拓扑</h3>
                  <p>供电拓扑回答“电从哪里来、经过哪些设备、最后送到谁”。它不是地图上的距离关系，而是设备之间真实的供电连接关系。</p>
                </article>
                <article>
                  <h3>接入点</h3>
                  <p>接入点是设备接入配电网络的具体“接手位置”，例如某座杆塔、电缆分支箱的某个出线位置或上级开关。</p>
                  <p>项目中的计量箱可能挂接到已有接入点，也可能需要新建接入点并选择上级设备。业务上关心的是“这个箱究竟从哪条供电链路接出来”，而不只是地图上离得近不近。</p>
                </article>
                <article>
                  <h3>箱表关系</h3>
                  <p>电能表安装在哪个计量箱、哪个表位。它帮助现场找到具体的表，也帮助判断箱内是否有漏表、错表或换表未更新。</p>
                </article>
                <article>
                  <h3>公变与专变</h3>
                  <p><strong>公变：</strong>通常是为一片区域内的多个低压客户提供供电服务的公用配电变压器。</p>
                  <p><strong>专变：</strong>通常是某个客户或单位专用的变压器，主要服务自身用电。不同地区和业务系统的分类称呼可能有差异，应以项目实际口径为准。</p>
                </article>
                <article>
                  <h3>产权、管理与使用</h3>
                  <p>设备属于谁、由谁维护、给谁使用，是三个不同问题。现场出现问题时，先判断问题属于客户设备、供电企业设备，还是双方分界点，才能确定处理责任。</p>
                </article>
              </div>
            `,
          },
          {
            id: "devices",
            short: "设备",
            title: "4. 现场设备怎么认",
            html: `
              <p>研发不可能记住每台设备的具体型号，但应该能根据外形、所在位置和业务名称判断它大致属于哪一类设备。下面是真实设备照片，型号、安装方式和地区外观会存在差异。</p>
              <div class="real-device-gallery">
                <figure class="device-photo-card">
                  <img src="./assets/images/real/distribution-transformer.jpg" alt="杆上安装的配电变压器、绝缘子和中压线路实拍" loading="lazy" />
                  <figcaption>
                    <span>01 · 配电变压器</span>
                    <strong>把中压降到低压</strong>
                    <p>常安装在电线杆、台架或配电室内。照片中白色圆筒状设备是杆上变压器。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:Utility_pole_with_transformer_and_power_lines.jpg" target="_blank" rel="noreferrer">照片：Candeadly / CC BY 4.0</a>
                  </figcaption>
                </figure>
                <figure class="device-photo-card">
                  <img src="./assets/images/real/switchgear.jpg" alt="配电变电站内的开关设备和变压器实拍" loading="lazy" />
                  <figcaption>
                    <span>02 · 开关设备区域</span>
                    <strong>控制线路通断和转供</strong>
                    <p>照片展示配电变电站的开关设备和变压器，不特指某一个开关柜型号。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:Distribution_substation_switchgear.jpg" target="_blank" rel="noreferrer">照片：Rsparks3 / CC0</a>
                  </figcaption>
                </figure>
                <figure class="device-photo-card">
                  <img src="./assets/images/real/distribution-box.jpg" alt="户外橙色配电箱实拍，箱体外接电缆" loading="lazy" />
                  <figcaption>
                    <span>03 · 配电箱</span>
                    <strong>现场分配和转接电能</strong>
                    <p>配电箱用途和外形差异很大。照片是户外用电场景，不能代表所有电缆分支箱。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:Distribution_box.jpg" target="_blank" rel="noreferrer">照片：Fumikas Sagisavas / CC0</a>
                  </figcaption>
                </figure>
                <figure class="device-photo-card">
                  <img src="./assets/images/real/meter-cabinet.jpg" alt="户外杆上安装的多个电能表计量箱实拍" loading="lazy" />
                  <figcaption>
                    <span>04 · 户外计量表箱</span>
                    <strong>集中安装电能表</strong>
                    <p>图中可以看到多个表位、进线和出线。不同地区有楼内、户外、落地式等多种表箱。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:Electricity_meters_inside_metering_cubicles,_Hong_Kong.jpg" target="_blank" rel="noreferrer">照片：Mk2010 / CC BY-SA 3.0</a>
                  </figcaption>
                </figure>
                <figure class="device-photo-card">
                  <img src="./assets/images/real/smart-meter.jpg" alt="墙面安装的带绿色液晶屏智能电能表实拍" loading="lazy" />
                  <figcaption>
                    <span>05 · 智能电能表</span>
                    <strong>记录并显示用电量</strong>
                    <p>照片能直观看到显示屏、表壳、接线和保护盖。现场还要核对表号、铭牌和封印。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:Smart_Electrical_Meter.jpg" target="_blank" rel="noreferrer">照片：Aliva Sahoo / CC BY-SA 4.0</a>
                  </figcaption>
                </figure>
                <figure class="device-photo-card">
                  <img src="./assets/images/real/current-transformer.jpg" alt="三相电缆穿过三个环形电流互感器的实拍" loading="lazy" />
                  <figcaption>
                    <span>06 · 电流互感器 CT</span>
                    <strong>把大电流缩小给电能表</strong>
                    <p>照片中的环形设备套在三相电缆上，用来感知一次侧电流并按变比输出二次侧信号。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:CurrentTransformers.jpg" target="_blank" rel="noreferrer">照片：Ali@gwc.org.uk / CC BY-SA 2.5</a>
                  </figcaption>
                </figure>
                <figure class="device-photo-card">
                  <img src="./assets/images/real/remote-terminal-unit.jpg" alt="多模块远程终端单元RTU实拍，带网口、串口和接线端子" loading="lazy" />
                  <figcaption>
                    <span>07 · 远程终端单元</span>
                    <strong>采集现场信号并上传</strong>
                    <p>图中是模块化 RTU，可接入数字量、模拟量和通信线路。实际采集终端或集中器外形可能不同。</p>
                    <a href="https://commons.wikimedia.org/wiki/File:Remote_Terminal_Unit_Modular.jpg" target="_blank" rel="noreferrer">照片：FernaCM / CC BY-SA 4.0</a>
                  </figcaption>
                </figure>
              </div>
              <div class="device-business-map">
                <div><span>配变</span><p>理解台区范围、供电能力和低压用户规模。</p></div>
                <div><span>开关设备</span><p>理解故障隔离、负荷转供和停电影响范围。</p></div>
                <div><span>配电箱 / 分支设施</span><p>理解线路从哪里分叉，计量箱挂接到哪个节点。</p></div>
                <div><span>计量箱 / 表</span><p>理解客户在哪里计量，换表与采集如何进行。</p></div>
                <div><span>互感器</span><p>理解大电流或高电压如何进入计量装置。</p></div>
                <div><span>采集终端</span><p>理解表计数据怎样传回采集主站。</p></div>
              </div>
              <div class="callout callout-amber">
                <strong>外形只是入口。</strong>
                <p>真正要理解的是“这台设备在哪个业务里出现”：它可能用于供电、计量、采集、巡视、停电处置，也可能同时承担多个作用。</p>
              </div>
            `,
          },
          {
            id: "objects",
            short: "拓扑",
            title: "5. 从配变到客户看懂供电拓扑",
            html: `
              <div class="photo-topology-row">
                <figure><img src="./assets/images/real/transmission-lines.jpg" alt="变电站和高压线路实拍" loading="lazy" /><figcaption>变电站 / 上级电源</figcaption></figure>
                <span aria-hidden="true">→</span>
                <figure><img src="./assets/images/real/distribution-transformer.jpg" alt="配电变压器和低压线路实拍" loading="lazy" /><figcaption>配电线路 / 配变</figcaption></figure>
                <span aria-hidden="true">→</span>
                <figure><img src="./assets/images/real/meter-cabinet.jpg" alt="计量箱和客户侧表计实拍" loading="lazy" /><figcaption>低压台区 / 计量箱</figcaption></figure>
              </div>
              <div class="topology-reading">
                <div><span>从哪来</span><strong>线路 → 配变</strong><p>判断停电和故障影响范围。</p></div>
                <div><span>属于谁</span><strong>配变 → 台区</strong><p>判断用户归哪个台区管理。</p></div>
                <div><span>接在哪</span><strong>接入点 → 计量箱</strong><p>判断箱体挂接和供电路径。</p></div>
                <div><span>怎么量</span><strong>计量箱 → 表位 → 客户</strong><p>判断哪只表对应哪个客户。</p></div>
              </div>
              <div class="callout callout-green">
                <strong>“台区一致”不等于“全部关系正确”。</strong>
                <p>计量箱可能挂在正确的台区，却接错了接入点；箱表关系可能正确，却对应错客户；客户供电关系可能正确，却由错误的设备主人负责巡视。</p>
              </div>
            `,
          },
          {
            id: "process",
            short: "流程",
            title: "6. 一条供电关系是怎样形成的",
            html: `
              <p>以一个低压客户接入为例，供电关系通常由下面几段组成：</p>
              <ol class="step-list">
                <li><b>找到上级电源</b><span>确认客户附近由哪条配电线路、哪台配变供电。</span></li>
                <li><b>确定供电范围</b><span>明确客户属于哪个低压台区，后续由谁管理和统计。</span></li>
                <li><b>选择接入位置</b><span>从低压线路、杆塔、分支箱或指定接入点接入客户。</span></li>
                <li><b>安装计量设施</b><span>确定计量箱、表位、电能表及必要的互感器和终端。</span></li>
                <li><b>建立客户关系</b><span>明确供电点对应哪个客户、用电用途和计量位置。</span></li>
                <li><b>持续维护关系</b><span>客户迁址、换表、设备改造或拓扑变化时，同步更新业务关系。</span></li>
              </ol>
              <div class="topology-reading">
                <div><span>从哪来</span><strong>配电线路 → 配变</strong><p>回答客户由谁供电。</p></div>
                <div><span>归哪管</span><strong>配变 → 台区</strong><p>回答属于哪个管理范围。</p></div>
                <div><span>接在哪</span><strong>接入点 → 计量箱</strong><p>回答现场从哪里接入。</p></div>
                <div><span>怎么量</span><strong>表位 → 客户</strong><p>回答哪个位置对应哪个客户。</p></div>
              </div>
              <div class="exception-box">
                <strong>易错点</strong>
                <ul>
                  <li>客户地址在 A 台区附近，不代表一定由 A 台区供电。</li>
                  <li>现场有计量箱，不代表箱一定已经正确接入业务关系。</li>
                  <li>电能表能采集数据，不代表表对应客户和计量点一定正确。</li>
                  <li>设备位置发生变化后，原有供电关系未必还能继续使用。</li>
                </ul>
              </div>
            `,
          },
          {
            id: "project-case",
            short: "关系案例",
            title: "7. 用小案例看懂设备归属",
            html: `
              <div class="case-header">
                <div><span>案例</span><strong>计量箱在 A 台区旁边，却由 B 台区供电</strong></div>
                <div class="case-badge">基础关系判断</div>
              </div>
              <p>“离得近”并不等于“接在那条线上”。判断设备归属需要沿实际供电关系逐级核实。</p>
              <div class="scenario-card">
                <p class="panel-label">判断顺序</p>
                <h3>“箱就在这里，为什么还要确认归属？”</h3>
                <p>人员位置说明“人站在哪里”；设备归属说明“设备由哪条线路、哪台配变供电”。箱体可能位于台区边缘，也可能线路跨越道路或楼栋，因此需要沿上级设备、线路和现场标识核实。</p>
              </div>
              <div class="business-cause-grid">
                <div><span>第一步</span><strong>看现场接线</strong><p>沿低压线路找到上级分支设施和配变，不凭距离判断。</p></div>
                <div><span>第二步</span><strong>核对设备标识</strong><p>确认箱体、杆塔和线路名称是否与现场一致。</p></div>
                <div><span>第三步</span><strong>核对业务资料</strong><p>比较系统台区、接入点和客户关系，找出冲突来源。</p></div>
                <div><span>第四步</span><strong>保留依据</strong><p>照片、位置和现场人员说明用于后续确认与修正。</p></div>
              </div>
            `,
          },
          {
            id: "software",
            short: "阅读关系",
            title: "8. 阅读任何新页面的四个关系问题",
            html: `
              <p>后续接触平台或专业微应用时，可以先不看页面字段，先用四个问题还原业务：</p>
              <div class="business-chain">
                <div><span>供电来源</span><strong>电从哪里来</strong><p>上级线路、配变、台区。</p></div>
                <i>→</i>
                <div><span>现场接入</span><strong>从哪里接进客户</strong><p>低压线路、接入点、计量箱。</p></div>
                <i>→</i>
                <div><span>计量位置</span><strong>在哪里量用电量</strong><p>计量点、表位、电能表。</p></div>
                <i>→</i>
                <div><span>业务使用</span><strong>谁用电、谁负责</strong><p>客户、供电点、设备责任范围。</p></div>
              </div>
              <div class="callout callout-green">
                <strong>先建立关系，再看页面。</strong>
                <p>装备主人、计量箱建档、空间拓扑、缺陷整改等内容会在后续专业应用阶段展开。这里先学会识别“这是哪类对象、它与谁相连、业务上代表什么”。</p>
              </div>
            `,
          },
          {
            id: "summary",
            short: "总结",
            title: "9. 本节总结",
            html: `
              <div class="takeaway-list">
                <div><span>1</span><p>认识设备不仅看外形，还要知道它在供电和业务中的作用。</p></div>
                <div><span>2</span><p>供电拓扑回答“电从哪里来、经过哪些设备、送到谁”。</p></div>
                <div><span>3</span><p>现场位置、供电归属和客户使用关系是不同业务事实。</p></div>
                <div><span>4</span><p>配变、台区、接入点、计量箱和表位处在不同关系层次。</p></div>
                <div><span>5</span><p>设备主人、建档、巡视、缺陷和拓扑维护将在后续专业应用阶段学习。</p></div>
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
              "计量箱最近一次拍照时间",
            ],
            correct: 1,
            explanation:
              "拓扑关系描述设备节点之间的连接或供电关系，而不是设备属性或人员联系信息。",
            optionNotes: [
              "材质和厂家属于设备属性。",
              "正确答案：拓扑回答“连接到谁、怎样供电”。",
              "在线状态属于运行或通信状态。",
              "拍照时间属于现场活动记录。",
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
            question: "同一个客户在系统中存在两个供电点，最合理的解释是什么？",
            options: [
              "客户可能在两个不同地址用电，或多个用电位置需要分别管理",
              "同一个客户永远只能有一个用电地址",
              "存在两个供电点一定是重复数据，可以立即删除一个",
              "供电点就是客户姓名，重复是姓名输错",
            ],
            correct: 0,
            explanation:
              "客户是业务主体，供电点是用电位置。一个客户可以对应多个地址或用途不同的供电点，应结合地址、计量和业务状态核实。",
            optionNotes: [
              "正确答案：客户与供电点不是一对一关系。",
              "同一客户可能存在住宅、商铺或其他用电地点。",
              "是否重复需要核实，不能直接把有效业务关系当作重复数据删除。",
              "客户身份和供电点位置是不同对象。",
            ],
          },
        ],
        next: {
          number: "04",
          title: "客户、供电点与计量点",
          text: "下一章会区分客户、地址、供电点、计量点和账户，建立客户业务关系的完整认识。",
        },
      },
    ],
  };

  const course = root.GRID_COURSE;
  const roadmap = root.GRID_ROADMAP;
  const lessonDetails = root.GRID_LESSON_DETAILS || {};
  const roadmapLessons = [];
  roadmap.stages.forEach((stage) => {
    stage.lessons.forEach((lesson) => {
      lesson.stage = stage;
      roadmapLessons.push(lesson);
    });
  });

  const buildGeneratedChapter = (lesson, index) => {
    const detail = lessonDetails[lesson.number];
    const nextLesson = roadmapLessons[index + 1];
    const learningObjectives =
      detail.learningObjectives ||
      lesson.keyPoints.map(
        (point) => `掌握“${point}”的业务含义及判断方法。`,
      );
    const chapterObjectives = detail.chapterObjectives || [
      lesson.goal,
      `能说明“${lesson.keyPoints[0]}”在业务中的作用。`,
      "能识别本讲常见异常，并知道下一步交给谁处理。",
    ];
    const otherLessons = roadmapLessons.filter((item) => item.number !== lesson.number);
    const discourage = (offset) => otherLessons[(index + offset) % otherLessons.length];
    const question1Wrong = [discourage(1), discourage(2), discourage(3)];
    const question2Wrong = [
      discourage(4).keyPoints[0],
      discourage(5).keyPoints[1],
      discourage(6).keyPoints[2],
    ];
    const processWrong = detail.process.slice(1, 4);
    const conceptCards = detail.concepts
      .map(
        ([name, explanation, impact]) => `
          <article>
            <h3>${name}</h3>
            <p><strong>通俗解释：</strong>${explanation}</p>
            <p><strong>业务影响：</strong>${impact}</p>
          </article>
        `,
      )
      .join("");
    const processNotes = detail.processNotes || [];
    const stepItems = detail.process
      .map(
        (step, stepIndex) =>
          `<li><b>${step}</b><span>${processNotes[stepIndex] || "按要求完成本环节并留下必要的业务结果。"}</span></li>`,
      )
      .join("");
    const devQuestionNotes = detail.devQuestionNotes || [];
    const questionCards = detail.devQuestions
      .map(
        (question, questionIndex) =>
          `<article><span>${String(questionIndex + 1).padStart(2, "0")}</span><h3>${question}</h3><p>${devQuestionNotes[questionIndex] || "先从业务目的和对象关系出发，再进入页面与操作。"}</p></article>`,
      )
      .join("");
    const pitfalls = detail.pitfalls.map((item) => `<li>${item}</li>`).join("");

    return {
      id: String(Number(lesson.number)),
      number: lesson.number,
      title: lesson.title,
      subtitle: lesson.goal,
      duration: "约 12 分钟",
      tags: lesson.keyPoints,
      objectives: chapterObjectives,
      sections: [
        {
          id: "goals",
          short: "目标",
          title: "1. 本节学习目标",
          html: `
            <div class="objective-grid">
              ${learningObjectives
                .map(
                  (objective, objectiveIndex) =>
                    `<div class="objective-card"><span>${String(objectiveIndex + 1).padStart(2, "0")}</span><p>${objective}</p></div>`,
                )
                .join("")}
            </div>
            <div class="callout callout-green">
              <strong>本讲在路线中的位置</strong>
              <p>${lesson.stage.title} · 第 ${lesson.number} 讲。${lesson.stage.goal}</p>
            </div>
          `,
        },
        {
          id: "background",
          short: "背景",
          title: "2. 业务背景",
            html: detail.backgroundHtml || `<p>${detail.background}</p>`,
        },
        {
          id: "concepts",
          short: "概念",
          title: "3. 核心概念",
          html: `<div class="concept-list">${conceptCards}</div>`,
        },
        {
          id: "objects",
          short: "对象",
          title: "4. 业务对象及关系",
            html:
              detail.objectsHtml ||
              `
            <p>本讲主要围绕 ${detail.concepts.map(([name]) => name).join("、")} 展开。对象之间不是简单的上下级关系，需要结合业务来源、现场位置和当前处理状态理解。</p>
            <div class="plain-term-grid">
              ${detail.concepts
                .map(
                  ([name, explanation]) =>
                    `<div><b>${name}</b><span>${explanation}</span></div>`,
                )
                .join("")}
            </div>
          `,
        },
        {
          id: "process",
          short: "流程",
          title: "5. 业务流程",
          html: `<ol class="step-list">${stepItems}</ol>`,
        },
        {
          id: "project-case",
          short: "案例",
          title: "6. 业务案例",
            html:
              detail.caseHtml ||
              `
            <div class="case-header">
              <div><span>关联项目</span><strong>${lesson.source}</strong></div>
              <div class="case-badge">业务场景</div>
            </div>
            <div class="scenario-card">
              <p class="panel-label">案例</p>
              <h3>${lesson.title}</h3>
              <p>${detail.case}</p>
            </div>
          `,
        },
        {
          id: "software",
          short: "业务理解",
          title: "7. 研发理解要点",
          html: `
            <p>阅读页面或需求时，先回答下面三个问题，再考虑具体功能。</p>
            <div class="business-question-grid">${questionCards}</div>
            <div class="exception-box">
              <strong>常见误区</strong>
              <ul>${pitfalls}</ul>
            </div>
          `,
        },
        {
          id: "summary",
          short: "总结",
          title: "8. 本节总结",
            html:
              (detail.summary &&
                `<div class="takeaway-list">${detail.summary
                  .map(
                    (item, summaryIndex) =>
                      `<div><span>${summaryIndex + 1}</span><p>${item}</p></div>`,
                  )
                  .join("")}</div>`) ||
              `
            <div class="takeaway-list">
              ${lesson.keyPoints
                .map(
                  (point, pointIndex) =>
                    `<div><span>${pointIndex + 1}</span><p>${point}：理解其业务目的、关联对象和异常影响。</p></div>`,
                )
                .join("")}
            </div>
          `,
        },
      ],
      quiz:
        detail.quiz ||
        [
        {
          id: `${lesson.number}-q1`,
          question: "本讲主要希望研发理解什么？",
          options: [lesson.goal, ...question1Wrong.map((item) => item.goal)],
          correct: 0,
          explanation: `本讲核心目标是：${lesson.goal}`,
          optionNotes: [
            "正确答案：与本讲定位一致。",
            "该内容属于其他学习阶段。",
            "该内容属于其他学习阶段。",
            "该内容属于其他学习阶段。",
          ],
        },
        {
          id: `${lesson.number}-q2`,
          question: "以下哪一项属于本讲的关键业务知识？",
          options: [lesson.keyPoints[0], ...question2Wrong],
          correct: 0,
          explanation: `${lesson.keyPoints[0]} 是本讲需要理解的核心知识点。`,
          optionNotes: [
            "正确答案：与本讲关键知识一致。",
            "该知识点属于其他课程。",
            "该知识点属于其他课程。",
            "该知识点属于其他课程。",
          ],
        },
        {
          id: `${lesson.number}-q3`,
          question: "处理本讲业务时，较合理的第一步是什么？",
          options: [detail.process[0], ...processWrong],
          correct: 0,
          explanation: `应先完成“${detail.process[0]}”，再根据业务结果进入后续环节。`,
          optionNotes: [
            "正确答案：符合本讲业务流程顺序。",
            "该步骤应在确认前置条件之后进行。",
            "该步骤应在确认前置条件之后进行。",
            "该步骤应在确认前置条件之后进行。",
          ],
        },
        ],
      next: nextLesson
        ? {
            number: nextLesson.number,
            title: nextLesson.title,
            text: nextLesson.goal,
          }
        : {
            number: "32",
            title: "路线学习完成",
            text: "你已经浏览完当前学习路线，可以回到前面的章节继续复习。",
          },
    };
  };

  roadmapLessons.forEach((lesson, index) => {
    lesson.chapterId = String(Number(lesson.number));
  });

  roadmapLessons.forEach((lesson, index) => {
    if (course.chapters.some((chapter) => Number(chapter.id) === Number(lesson.number))) {
      return;
    }
    course.chapters.push(buildGeneratedChapter(lesson, index));
  });

  course.chapters.sort((left, right) => Number(left.id) - Number(right.id));
})(typeof window !== "undefined" ? window : globalThis);
