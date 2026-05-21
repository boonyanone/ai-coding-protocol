# 🤖 Agentic Workflow Framework

กรอบการทำงานที่เข้มงวด (Strict Rules), จัดการความจำไม่ตกหล่น (Memory-Persistent), ควบคุม UI เป็นระบบ และประหยัด Token สำหรับพัฒนาซอฟต์แวร์ร่วมกับ AI Coding Agents (เช่น Cursor, Windsurf, Cline, Antigravity, Claude)

[Read in English](README.md)

ผสมผสานแนวคิดจาก **Superpowers**, **LLM Wiki (Karpathy)**, **Reflexion**, **9arm Protocol** และระบบประหยัด Token เพื่อป้องกัน Context บวม, Hallucination, การทำเกินสั่ง และ UI มั่ว

---

## 📁 1. โครงสร้างโฟลเดอร์หน่วยความจำ (.ai/ Directory)

แยกความจำเป็น **RAM** (สั้น กระชับ อ่านทุกเซสชัน) กับ **Hard Drive** (อ่านเฉพาะเมื่อจำเป็น):

```text
/ (Root Project)
├── .ai/
│   ├── STATE.md                    # [RAM] งานปัจจุบัน + สเต็ปถัดไป (ห้ามเกิน 20 บรรทัด)
│   ├── REFLECTIONS.md              # [Reflexion] บทเรียนความผิดพลาด (เก็บล่าสุดไม่เกิน 15 รายการ)
│   ├── templates/                  # เทมเพลตเปล่าสำหรับขึ้นโปรเจกต์ใหม่
│   │   ├── STATE.template.md
│   │   └── REFLECTIONS.template.md
│   └── docs/                       # [Hard Drive] ความรู้เชิงระบบ (อ่าน On-demand เท่านั้น)
│       ├── architecture.md         # สถาปัตยกรรม เทคโนโลยี โครงสร้างโฟลเดอร์
│       ├── ui_guidelines.md        # มาตรฐาน Design System (สี, Font, Component, Layout)
│       ├── database.md             # Schema และกฎการจัดการฐานข้อมูล
│       └── security_policy.md      # นโยบายความปลอดภัย, Env, Secrets
├── .cursorrules / SKILL.md         # ไฟล์คำสั่งหลักที่บังคับ AI ปฏิบัติตามกฎ 4 Pillars
└── (Source Code...)
```

---

## 📜 2. กฎเหล็ก 4 Pillars สำหรับควบคุม AI

เมื่อ AI ทำงานใน Repository นี้ **ต้องปฏิบัติตาม 4 เสาหลักอย่างเคร่งครัด:**

---

### 🏛️ Pillar 1: Strict Execution & Safety (การรันคำสั่งอย่างเป็นระบบและปลอดภัย)

#### 1.1 Planning & Confirmation
1. **No Vibe Coding:** ห้ามเขียนโค้ดโดยไม่มีแผน ต้องสรุปสิ่งที่เข้าใจและลิสต์ไฟล์ที่จะแตะพร้อมผลลัพธ์ที่คาดหวัง
2. **Instruction Checksum:** ทุกครั้งที่ผู้ใช้สั่งงาน AI ต้องทวนคำสั่งย่อๆ เป็น Bullet points ก่อนลงมือทำ
3. **Architectural Fork Rule:** หากมีทางเลือกในการออกแบบมากกว่า 1 วิธี **ห้ามสุ่มเลือกทำเอง** ต้องเสนออย่างน้อย 2 ทางเลือกพร้อมข้อดี/ข้อเสียให้ผู้ใช้เคาะก่อน

#### 1.2 Scope & Stepping
4. **Scope Lock:** ห้ามแตะ แก้ไข หรือลบโค้ดในไฟล์ที่ไม่อยู่ในขอบเขตแผนงาน
5. **Micro-Stepping (Max 2 Files):** ห้ามแก้เกิน 2 ไฟล์ต่อสเต็ป เมื่อทำเสร็จ 1 สเต็ปย่อย ให้รันทดสอบ → ส่งผลลัพธ์ → พิมพ์ `[WAITING_FOR_USER]` → หยุดรอ
6. **No Double-Dipping (Refactoring Isolation):** ห้าม Refactor โค้ดเก่าพร้อมกับเพิ่มฟีเจอร์ใหม่ในสเต็ปเดียวกัน ถ้าต้อง Refactor ให้ทำเป็นสเต็ปแยก → Commit → แล้วค่อยเริ่มฟีเจอร์ใหม่

#### 1.3 Error Handling & Rollback
7. **Error Retry Limit (Max 3):** หากแก้โค้ดแล้ว Error AI ลองแก้ได้ไม่เกิน 3 ครั้ง หากยังไม่ผ่าน ต้อง:
   - หยุดทันที
   - วิเคราะห์สาเหตุรากเหง้า (Root Cause)
   - เสนอทางเลือก: แก้ไขตามแนวทางใหม่ **หรือ** Rollback
   - ห้ามลองมั่วไปเรื่อยๆ
8. **Rapid Rollback Protocol:** หากระบบพังจนหาสาเหตุไม่ได้ ให้เสนอคำสั่ง Rollback ทันที (เช่น `git restore .` หรือ `git checkout -- <file>`) เพื่อกลับจุดที่ทำงานได้ล่าสุด แทนการฝืนปะผุโค้ดต่อ

#### 1.4 Verification & Safety
9. **Read Before Reference:** ห้ามเขียนโค้ดอ้างอิงฟังก์ชัน/Component/API ของไฟล์อื่น หากยังไม่ได้เปิดดูไฟล์ต้นทางนั้นในเซสชันปัจจุบัน
10. **Verification Checklist:** ก่อนส่งมอบงาน ต้องรัน Linter/Typecheck (เช่น `tsc --noEmit`, `npm run lint`) และตรวจสอบ UI เสมอ
11. **Destructive Action Guard:** ห้ามลบไฟล์หรือ Overwrite ไฟล์ใหญ่ทั้งไฟล์โดยไม่ได้รับคำสั่งเจาะจงจากผู้ใช้
12. **Dependency Guard:** ก่อนติดตั้ง Package ใหม่ ต้องตรวจสอบ `package.json` (หรือ `requirements.txt`) ก่อนเสมอ ถ้ามีอยู่แล้วหรือมีตัวที่ทำหน้าที่เดียวกัน ห้ามติดตั้งซ้ำซ้อน
13. **Security Protocol:**
    - ห้าม Hardcode secrets, API keys, passwords ลงในซอร์สโค้ดเด็ดขาด
    - ต้องใช้ `.env` + ตรวจสอบว่า `.gitignore` ครอบคลุม `.env` แล้ว
    - ก่อน Commit ต้องสแกนว่าไม่มี Secret หลุดเข้าไปใน Staged files

#### 1.5 Git Discipline
14. **Conventional Commits:** ทุก Commit message ต้องใช้รูปแบบมาตรฐาน:
    - `feat: เพิ่มระบบลงทะเบียนผู้ใช้งาน`
    - `fix: แก้ปัญหาปุ่ม Submit ไม่ตอบสนอง`
    - `refactor: ปรับโครงสร้างโฟลเดอร์ components ใหม่`
    - `docs: อัปเดตไฟล์ STATE.md`
    - `style: ปรับสีและ Padding ของหน้า Dashboard`
15. **Clean Workspace Guard:** ก่อนเริ่มสเต็ปใหม่ ต้องตรวจสอบสถานะ Git ว่าไม่มีโค้ดค้างที่ยัง Uncommitted

---

### 🧠 Pillar 2: Memory & Reflexion (ความจำและการแก้ไขตัวเอง)

1. **Session Startup Protocol:** เมื่อเริ่มสนทนาใหม่ AI ต้องอ่าน `.ai/STATE.md` และ `.ai/REFLECTIONS.md` เป็นอันดับแรกเสมอ
2. **Active State Maintenance:** อัปเดต `.ai/STATE.md` ทั้งตอนเริ่มงานและเมื่อจบสเต็ปย่อย (จำกัดไม่เกิน 20 บรรทัด)
3. **Self-Correction (Reflexion):** เมื่อแก้บั๊กสำเร็จ ต้องบันทึกสาเหตุ + วิธีแก้ลงใน `.ai/REFLECTIONS.md`
4. **Reflections Pruning Rule:** `REFLECTIONS.md` เก็บล่าสุดไม่เกิน **15 รายการ** รายการเก่าที่สุดให้ย้ายไปเก็บถาวรใน `.ai/docs/reflections_archive.md` เพื่อป้องกันไฟล์บวมกิน Token
5. **Knowledge Archiving:** เมื่อฟีเจอร์เสร็จสมบูรณ์ ย้ายสรุปเทคนิคจาก `STATE.md` ไป `.ai/docs/`
6. **Environment Awareness:** ตระหนักรู้สภาพแวดล้อม (Dev / Staging / Prod) ห้ามทดสอบบน Prod โดยไม่ได้รับอนุมัติ
7. **Context Window Alert:** หากรู้สึกว่าบทสนทนายาวเกินไป หรือเริ่มจำบริบทก่อนหน้าไม่ได้ ต้อง:
   - บันทึก STATE.md ให้เป็นปัจจุบัน
   - แนะนำผู้ใช้ให้เริ่มเซสชันใหม่

---

### 🎨 Pillar 3: Premium UX/UI & Design System (ระบบควบคุมดีไซน์)

1. **Shadcn/UI & Tailwind as SSOT:** ห้ามเขียน CSS เปล่าหรือสร้าง Component พื้นฐาน (ปุ่ม, โมดอล, การ์ด) เอง ใช้ **shadcn/ui** + **Tailwind CSS** เป็นหลัก ต้องการ Component เพิ่ม → `npx shadcn-ui@latest add <name>`
2. **Design Tokens First:** ต้องอ่าน `.ai/docs/ui_guidelines.md` หรือ `tailwind.config` ก่อนดีไซน์ ห้ามตั้งสีใหม่หรือใช้ Spacing นอกข้อตกลงโดยไม่มีเหตุผล
3. **Consult Modern Web Guidance:** ก่อนเขียน Layout ที่ซับซ้อน ต้องเช็กคู่มือหรือแนวทางปฏิบัติเพื่อใช้ Best Practices ที่เป็นปัจจุบัน
4. **Layout Uniformity:** ทุกหน้าต้องใช้ Layout Wrapper และ Navigation เดียวกัน ห้ามสร้างโครงสร้างหน้าใหม่ตามใจจนหน้าเว็บกระจัดกระจาย

---

### ⚡ Pillar 4: Token-Saving & Efficiency (โปรโตคอลประหยัด Token)

1. **Clean Session Protocol:** เมื่อจบงานย่อย + Git Commit แล้ว แนะนำผู้ใช้ **เริ่มแชทใหม่** เพื่อรีเซ็ตประวัติที่บวม (เซสชันใหม่อ่าน `STATE.md` ได้ทันที)
2. **Diff-Only Output:** ห้ามพิมพ์โค้ดทั้งไฟล์ในแชท ส่งเฉพาะ Diff หรือส่วนที่เปลี่ยน
3. **Context Paging:** ห้ามอ่านไฟล์ทั้งไฟล์หากต้องการดูแค่บางส่วน ใช้ `StartLine/EndLine` หรือค้นหาเฉพาะจุด
4. **On-Demand Reading:** ไฟล์ใน `.ai/docs/` อ่านเฉพาะเมื่อต้องทำงานที่เกี่ยวข้อง ห้ามโหลดทั้งหมดตั้งแต่เริ่มเซสชัน
5. **Concise Communication:** ตอบกระชับ เน้น Bullet points หรือตาราง งดเกริ่นนำที่เป็น "น้ำ" เข้าประเด็นทันที

---

## 🛠️ 4. ตารางความเข้ากันได้ (Compatibility Matrix)

### ⚙️ AI Tools ที่รองรับ
| Tool | Config File | หมายเหตุ |
|------|-------------|----------|
| **Cursor IDE** | `.cursorrules` | วาง 4 Pillars ในไฟล์นี้ |
| **Windsurf IDE** | `.windsurfrules` | รูปแบบเดียวกับ Cursor |
| **Cline / Roo Cline** | `.clinerules` | VS Code Extension |
| **Claude (Pro/Team)** | `Project Instructions` | ใส่กฎในช่อง Custom Instructions ของโปรเจกต์ |
| **Antigravity** | `SKILL.md` หรือ Skills | ผสมกับ Skills ในเครื่องได้ |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Workspace-level instructions |
| **Aider** | `.aider.conf.yml` + conventions | ใส่กฎเป็น conventions file |

---

## 📈 5. วิธีเริ่มต้นใช้งาน (Getting Started)

```bash
# 1. Clone framework
git clone https://github.com/<your-org>/ai-coding-protocol.git

# 2. คัดลอกโฟลเดอร์ .ai/ ไปวางใน Root ของโปรเจกต์คุณ
cp -r ai-coding-protocol/.ai/ /path/to/your/project/.ai/

# 3. คัดลอกกฎ 4 Pillars ไปใส่ Config ของ AI Tool ที่ใช้
# สำหรับ Cursor:
cp ai-coding-protocol/.cursorrules /path/to/your/project/.cursorrules

# 4. เริ่มสั่งงาน AI ด้วยประโยคแรก:
# "กรุณาอ่าน .ai/STATE.md และ .ai/REFLECTIONS.md แล้วเริ่มทำงาน"
```

---

## 📋 6. Checklist สำหรับตรวจสอบก่อน Push ขึ้น Git

- [ ] `.ai/STATE.md` เป็นปัจจุบัน อยู่ในขอบ 20 บรรทัด
- [ ] `.ai/REFLECTIONS.md` ไม่เกิน 15 รายการ
- [ ] `.env` อยู่ใน `.gitignore` แล้ว
- [ ] ไม่มี Secret/API Key หลุดใน Source Code
- [ ] Commit message ตามรูปแบบ Conventional Commits
- [ ] Linter/Typecheck ผ่าน
- [ ] UI หน้าใหม่ใช้ Layout Wrapper เดียวกับหน้าเดิม
