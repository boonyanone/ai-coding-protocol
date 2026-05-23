# 🤖 Agentic Workflow Framework

กรอบการทำงานที่เข้มงวด (Strict Rules), จัดการความจำไม่ตกหล่น (Memory-Persistent), ควบคุม UI เป็นระบบ และประหยัด Token สำหรับพัฒนาซอฟต์แวร์ร่วมกับ AI Coding Agents (เช่น Cursor, Windsurf, Cline, Antigravity, Claude)

[Read in English](README.md)

ผสมผสานแนวคิดจาก **Superpowers**, **LLM Wiki (Karpathy)**, **Reflexion**, **9arm Protocol** และระบบประหยัด Token เพื่อป้องกัน Context บวม, Hallucination, การทำเกินสั่ง และ UI มั่ว

📖 **[อ่านคู่มือการใช้งานแบบละเอียด (User Manual)](USER_MANUAL.th.md)**

---

## 🌟 ทำไมต้องใช้ Framework นี้? (ปัญหาที่ช่วยแก้)

หากคุณใช้งาน AI ช่วยเขียนโค้ดใน IDE เป็นประจำ คุณอาจจะเคยเจอปัญหาเหล่านี้:
- ⚠️ **แชทยาวเกินไป (Context Bloat):** พอยิ่งคุยยาว AI ยิ่งตอบช้าลง เปลือง Token และเริ่มมั่ว
- ⚠️ **AI ความจำเสื่อม (Agent Amnesia):** พอต้องขึ้นแชทใหม่ (New Session) AI ก็ลืมกฎของโปรเจกต์ ลืมโครงสร้าง และลืมบั๊กที่เคยแก้ไปแล้ว
- ⚠️ **ดีไซน์ไม่คงที่ (UI Inconsistency):** AI มักจะสุ่มสีหรือสร้าง UI แบบใหม่ขึ้นมาเองโดยไม่สน Design System เดิมของเรา

**AI Coding Protocol** เข้ามาช่วยแก้ปัญหาเหล่านี้ โดยทำหน้าที่เป็น **ผู้ช่วยจัดระเบียบ (Governance Framework)** ที่ทำงานร่วมกับ IDE เดิมของคุณ (Cursor, Windsurf, Cline) อย่างราบรื่น

สิ่งที่คุณจะได้จาก Framework นี้:
- ✅ **ระบบจัดการความจำ (Active Memory):** มีไฟล์ `STATE.md` และ `REFLECTIONS.md` คอยจดจำสถานะงานและบทเรียนข้ามเซสชัน
- ✅ **ส่งต่องานง่ายดาย (One-Click Handoff):** สคริปต์ช่วยแพ็กสรุปงานจากแชทเก่า ไปเริ่มแชทใหม่ที่สะอาดและลื่นไหลกว่า โดยไม่เสียบริบท
- ✅ **ระบบป้องกันความปลอดภัย:** มี Git Hook คอยตรวจจับไม่ให้เผลอ Commit ไฟล์ `.env` และช่วยคุมไฟล์ความจำไม่ให้ใหญ่เกินไป
- ✅ **เครื่องมือดูแลอัตโนมัติ (CLI):** มีสคริปต์ `./ai-protocol.sh` คอยช่วยจัดการงานที่ยุ่งยาก และมีระบบอัปเดตตัวเองให้ทันสมัยอยู่เสมอ
- ✅ **คลังวิจัยเชิงลึก (Deep Research Hub):** รองรับการติดตั้ง NotebookLM MCP เพื่อให้ AI อัปโหลดและแชทถามข้อมูลจาก Document ขนาดยักษ์ได้โดยไม่ต้องเปลือง Token (ใช้คำสั่ง `./ai-protocol.sh install-mcp`)

---

## ✨ Killer Feature: คลังวิจัยเชิงลึก (Deep Research Hub)

บอกลาปัญหา **"โยน Document หรือคู่มือยาวๆ ให้ AI อ่านแล้ว Token หมด หรือแชทพัง"**! 
Framework ของเรามาพร้อมกับตัวเชื่อมต่อ **NotebookLM MCP** ที่ติดตั้งได้ในคำสั่งเดียว (`./ai-protocol.sh install-mcp`)

**มันทำงานอย่างไร?**
แทนที่ AI ใน IDE ของคุณจะต้องพยายามอ่าน API Reference ที่หนาเป็นหมื่นบรรทัดด้วยตัวเอง มันจะทำการ "อัปโหลดไฟล์นั้นเข้าไปเก็บในบัญชี NotebookLM ของ Google" จากนั้น AI ใน IDE จะทำหน้าที่แค่ **ยิงคำถาม** เพื่อดึงเฉพาะส่วนที่จำเป็นกลับมาเขียนโค้ดให้คุณ

**🔥 ประโยชน์ที่คุณจะได้รับ:**
- **ประหยัด Token มหาศาล:** ไม่ต้องสูญเสีย Token (และเงิน) ไปกับการให้ AI สแกนเอกสารซ้ำแล้วซ้ำเล่า
- **Context ไม่พัง:** แชทใน IDE ของคุณจะลื่นไหลเหมือนเดิม ความจำไม่เสื่อม
- **ทำงานแม่นยำขึ้น:** NotebookLM ถูกออกแบบมาเพื่อวิเคราะห์เอกสารขนาดใหญ่โดยเฉพาะ ทำให้การดึงข้อมูลมาเขียนโค้ดแม่นยำกว่าการยัดไฟล์เข้า IDE ตรงๆ

---

## 📁 1. โครงสร้างโฟลเดอร์หน่วยความจำ (.ai/ Directory)

แยกความจำเป็น **RAM** (สั้น กระชับ อ่านทุกเซสชัน) กับ **Hard Drive** (อ่านเฉพาะเมื่อจำเป็น):

```text
/ (Root Project)
├── .ai/
│   ├── STATE.md                    # [RAM] งานปัจจุบัน + สเต็ปถัดไป (ห้ามเกิน 20 บรรทัด)
│   ├── REFLECTIONS.md              # [Reflexion] บทเรียนความผิดพลาด (เก็บล่าสุดไม่เกิน 15 รายการ)
│   ├── DECISIONS.md                # [ADR] บันทึกการตัดสินใจเชิงสถาปัตยกรรม (เช่น เลือกใช้ DB อะไร)
│   ├── templates/                  # เทมเพลตเปล่าสำหรับขึ้นโปรเจกต์ใหม่
│   │   ├── STATE.template.md
│   │   ├── REFLECTIONS.template.md
│   │   ├── DECISIONS.template.md
│   │   └── ui/                     # เทมเพลต Design System ให้เลือกสลับได้
│   │       ├── futuristic.md       # Space-Dark + Glassmorphism (Default)
│   │       ├── minimal.md          # เรียบหรู ขาว-ดำ (สไตล์ shadcn/ui)
│   │       ├── vibrant.md          # สีสดใส กระจกใส (สไตล์ HeroUI)
│   │       └── data_heavy.md       # หน้า Dashboard (สไตล์ Tremor)
│   ├── prompts/                    # [Shortcuts] โฟลเดอร์รวม Prompt ลัดสำหรับก๊อปวาง
│   │   ├── 01-session-start.md     # เริ่มเซสชันใหม่
│   │   ├── 02-session-end.md       # จบเซสชัน / ส่งงาน
│   │   ├── 03-bug-hunting.md       # โหมดล่าบั๊ก
│   │   └── 04-code-review.md       # สั่ง AI รีวิวโค้ดก่อนส่ง
│   └── docs/                       # [Hard Drive] ความรู้เชิงระบบ (อ่าน On-demand เท่านั้น)
│       ├── api_contracts/          # [API] โครงสร้าง API ป้องกัน AI มั่วข้อมูล
│       ├── architecture.md         # สถาปัตยกรรม เทคโนโลยี โครงสร้างโฟลเดอร์
│       ├── ui_guidelines.md        # มาตรฐาน Design System (สี, Font, Component, Layout)
│       ├── database.md             # Schema และกฎการจัดการฐานข้อมูล
│       └── security_policy.md      # นโยบายความปลอดภัย, Env, Secrets
├── .gitignore                       # ป้องกัน .env, node_modules, etc. หลุดขึ้น Git
├── ai-protocol.sh                   # เครื่องมือ CLI สำหรับรันสคริปต์อัตโนมัติ
├── ai-protocol.js                   # สคริปต์ Node.js ระบบเบื้องหลัง
├── .cursorrules / SKILL.md          # ไฟล์คำสั่งหลักที่บังคับ AI ปฏิบัติตามกฎ 4 Pillars
└── (Source Code...)
```

---

## 📜 2. กฎเหล็ก 4 Pillars สำหรับควบคุม AI

เมื่อ AI ทำงานใน Repository นี้ **ต้องปฏิบัติตาม 4 เสาหลักอย่างเคร่งครัด:**

### 🏛️ Pillar 1: Strict Execution & Safety
1. **Progressive Complexity:** ปรับระดับการทำงานตามความซับซ้อน:
   - *งานเล็ก (Minor):* ลงมือทำได้เลย ไม่ต้องวางแผน
   - *งานกลาง (Standard):* วางแผน + แก้ไขทีละ 2 ไฟล์ (Micro-Stepping)
   - *งานใหญ่ (Major):* วางแผน + สร้างบันทึกตัดสินใจใน `DECISIONS.md` + เขียน Test ก่อน
2. **API Contract-First:** ห้ามให้ AI "เดา" หรือ "จินตนาการ" โครงสร้าง API เองเด็ดขาด! ก่อนเขียน API Call จะต้องสร้าง/อ่านไฟล์ Schema ใน `.ai/docs/api_contracts/` หรือรัน `curl` เพื่อเอาผลลัพธ์จริงมากางก่อน
3. **AI-TDD (Test-Driven):** สำหรับ Business Logic หลัก (ระบบคำนวณ, ตรวจสอบสิทธิ์) บังคับให้ AI เขียนสคริปต์ทดสอบ (Automated test) ควบคู่ไปด้วยเสมอ
4. **No Vibe Coding:** ห้ามเขียนโค้ดโดยไม่มีแผน ต้องสรุปสิ่งที่เข้าใจและลิสต์ไฟล์ที่จะแตะพร้อมผลลัพธ์ที่คาดหวัง
5. **Instruction Checksum:** ทุกครั้งที่ผู้ใช้สั่งงาน AI ต้องทวนคำสั่งย่อๆ
6. **Architectural Fork Rule:** ห้ามสุ่มเลือกทางเลือกออกแบบเอง เสนอ 2 ทางเลือกให้ผู้ใช้พิจารณาก่อน
7. **Scope Lock & Micro-Stepping:** ห้ามแตะไฟล์ที่ไม่เกี่ยว, แก้สูงสุด 2 ไฟล์ต่อรอบ
8. **Error Retry Limit (Max 3):** ถ้า Error เกิน 3 รอบ ห้ามฝืนแก้ ให้หยุดหาสาเหตุ
9. **Rapid Rollback Protocol:** พังเกินเยียวยา เสนอ `git restore .` ทันที
10. **Security Protocol:** ห้าม Hardcode Secret ต้องใช้ `.env` เสมอ และห้ามลืม `.gitignore`

### 🧠 Pillar 2: Memory & Reflexion (ความจำและการแก้ไขตัวเอง)
1. **Session Startup Protocol:** อ่าน `STATE.md` และ `REFLECTIONS.md` เป็นอันดับแรก
2. **ADR (Architecture Decision Records):** บันทึกการตัดสินใจที่สำคัญๆ (เช่น เลือก Framework, Library) ลงใน `DECISIONS.md`
3. **Reflections Pruning Rule:** เก็บความจำล่าสุดไว้ใน `REFLECTIONS.md` ไม่เกิน 15 อัน รายการเก่าสุดให้ย้ายเข้า `reflections_archive.md` (ใช้ `ai-protocol.sh prune` ช่วยได้)
4. **Context Window Alert:** ถ้ายาวไป ให้ขอขึ้นแชทใหม่

### 🎨 Pillar 3: Premium UX/UI & Design System (ระบบควบคุมดีไซน์)
1. **Shadcn/UI & Tailwind as SSOT:** ห้ามเขียน CSS เปล่า ใช้ shadcn/ui เป็นหลัก
2. **Design Tokens First:** อ่าน `ui_guidelines.md` ก่อน ห้ามเดาสี
3. **Layout Uniformity:** ใช้ Layout Wrapper ตัวเดิม ไม่ฉีกกรอบ

### ⚡ Pillar 4: Token-Saving & Efficiency (โปรโตคอลประหยัด Token)
1. **Clean Session Protocol:** แนะนำผู้ใช้ให้ **เริ่มแชทใหม่** บ่อยๆ เพื่อไม่ให้ Token พุ่ง โดยสามารถก๊อป Prompt จาก `.ai/prompts/` มาใช้เปิด/ปิดเซสชันได้ง่ายๆ
2. **Diff-Only Output:** ส่งแค่ส่วนที่เปลี่ยน ไม่พ่นโค้ดทั้งไฟล์

---

## 🎨 3. การเปลี่ยนธีม Design System (UI Themes)

ค่าเริ่มต้น (Default) ของ Framework นี้จะใช้ธีม **Space-Dark Glassmorphism** แต่เรามี 4 สไตล์มาตรฐานระดับพรีเมียมให้เลือกใช้

หากต้องการเปลี่ยนสไตล์ สามารถก๊อปปี้ไฟล์เทมเพลตจาก `.ai/templates/ui/` ไปทับ `.ai/docs/ui_guidelines.md` ได้เลย:

```bash
# แบบที่ 1: Minimalist & Clean (สไตล์ shadcn/ui, เรียบหรู ขาว-ดำ)
cp .ai/templates/ui/minimal.md .ai/docs/ui_guidelines.md

# แบบที่ 2: Modern Vibrant (สไตล์ HeroUI/NextUI, สีสันสดใส, กระจกใส)
cp .ai/templates/ui/vibrant.md .ai/docs/ui_guidelines.md

# แบบที่ 3: Data-Heavy (สไตล์ Tremor, เหมาะกับหน้า Dashboard, เน้นอ่านข้อมูล)
cp .ai/templates/ui/data_heavy.md .ai/docs/ui_guidelines.md

# แบบที่ 4: Futuristic Space-Dark (สไตล์ Aceternity, อวกาศล้ำๆ - Default)
cp .ai/templates/ui/futuristic.md .ai/docs/ui_guidelines.md
```
เมื่อเปลี่ยนไฟล์แล้ว AI จะอ่านและยึดสไตล์ใหม่นี้เป็นหลักในการเขียน CSS/Tailwind ให้คุณทันที!

---

## 🚀 4. เครื่องมืออัตโนมัติ (`ai-protocol.sh`)

เรามีสคริปต์แบบพกพาที่ไม่ต้องการ Library เพิ่มเติม (ใช้แค่ Node.js พื้นฐาน) เพื่อช่วยดูแล Repository ให้ถูกหลักอนามัย:

```bash
# ติดตั้ง Protocol ในโปรเจกต์ของคุณ (ก๊อปปี้ templates, prompts, docs และสร้างไฟล์กฎสำหรับ AI ทุกค่ายอัตโนมัติ)
./ai-protocol.sh init

# ตรวจสอบความปลอดภัย (.env) และแจ้งเตือนถ้าไฟล์ความจำยาวเกินไป
./ai-protocol.sh check

# ตัดตอน Reflections เก่าๆ (เกิน 15 รายการ) ไปเก็บถาวรเพื่อประหยัด Token
./ai-protocol.sh prune

# แบ็คอัป STATE.md ของเดิมเข้าโฟลเดอร์ประวัติ และสร้าง STATE.md อันใหม่ให้สะอาด
./ai-protocol.sh clean

# สร้าง Handoff Prompt สำหรับส่งต่อบริบทงานไปยังแชทใหม่ (ลด Token, ไม่เสียบริบท)
./ai-protocol.sh handoff

# เปิดหน้าจอ Dashboard สรุปงานและสถานะทั้งหมดของ AI
./ai-protocol.sh dashboard

# ติดตั้ง Git Hook เพื่อรันการตรวจ check ก่อนสั่ง git commit ทุกครั้ง
./ai-protocol.sh install-hook

# อัปเดตตัวระบบ AI Protocol ให้เป็นเวอร์ชันล่าสุดจาก GitHub อัตโนมัติ
./ai-protocol.sh update
```

---

## 🛠️ 5. ตารางความเข้ากันได้ (Compatibility Matrix)

ไฟล์ Config ด้านล่างทั้งหมดจะถูกสร้างอัตโนมัติเมื่อรัน `./ai-protocol.sh init`

| Tool | Config File |
|------|-------------|
| **Cursor IDE** | `.cursorrules` |
| **Windsurf IDE** | `.windsurfrules` |
| **Cline / Roo Cline** | `.clinerules` |
| **Claude Code / Claude** | `.clauderules` / `.claudecoderc` |
| **Antigravity** | `SKILL.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Aider** | `.aider.conf.yml` + conventions |

---

## 📈 6. วิธีเริ่มต้นใช้งาน (Getting Started)

```bash
# 1. Clone framework
git clone https://github.com/<your-org>/ai-coding-protocol.git

# 2. เข้าไปที่โฟลเดอร์โปรเจกต์ของคุณ และใช้คำสั่ง init
cd /path/to/your/project
/path/to/ai-coding-protocol/ai-protocol.sh init

# 3. เสร็จแล้ว! คำสั่ง init จะทำสิ่งต่อไปนี้ให้อัตโนมัติ:
#    - สร้างโฟลเดอร์ .ai/ พร้อม templates, prompts, และ docs
#    - สร้างไฟล์กฎสำหรับ AI ทุกค่าย (Cursor, Windsurf, Cline, Claude, Antigravity, Copilot)
#    - สร้าง STATE.md, REFLECTIONS.md, และ DECISIONS.md พร้อมใช้งาน

# 4. เริ่มสั่งงาน AI โดยก๊อปปี้ข้อความจาก `.ai/prompts/01-session-start.md`
```
