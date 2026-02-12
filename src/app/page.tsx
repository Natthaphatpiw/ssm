import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.brandTitle}>ScamShield Alliance</span>
          <span className={styles.brandSubtitle}>
            LINE OA สำหรับตรวจสอบ scammers และสร้างภูมิคุ้มกันชุมชน
          </span>
        </div>
        <span className={styles.navBadge}>LINE OA · AI Guard</span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>Scam Intelligence Network</div>
            <h1 className={styles.heroTitle}>
              ตรวจข้อความและรูปภาพที่น่าสงสัยแบบทันที
              <br />
              พร้อมสรุปความเสี่ยงเป็นเปอร์เซ็นต์
            </h1>
            <p className={styles.heroBody}>
              ScamShield Alliance ช่วยคัดกรอง SMS, แชทหลอกลงทุน, romance
              scam, ภาพหน้าจอพัสดุ หรือรูปเบอร์โทรที่น่าสงสัย ด้วย GPT-4.1-mini
              แล้วตอบกลับเป็นไทย พร้อมจุดสังเกตและวิธีรับมือที่ทำได้ทันที.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.primaryBtn} href="#">
                เพิ่มเพื่อนใน LINE
              </a>
              <span className={styles.secondaryNote}>Webhook: /api/line/webhook</span>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.statCard}>
                <div className={styles.statValue}>3</div>
                <div className={styles.statLabel}>ประเภทอินพุตที่รองรับ</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>0-100%</div>
                <div className={styles.statLabel}>คะแนนความเสี่ยงมิจฉาชีพ</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statValue}>24/7</div>
                <div className={styles.statLabel}>ตอบกลับแบบอัตโนมัติ</div>
              </div>
            </div>
          </div>
          <div className={styles.heroCard}>
            <div className={styles.heroCardTitle}>ตัวอย่างการตอบกลับ</div>
            <div className={styles.chatBubble}>
              ผู้ใช้: “พัสดุตกค้าง คลิกลิงก์เพื่อยืนยันที่อยู่”
            </div>
            <div className={`${styles.chatBubble} ${styles.analysisBubble}`}>
              <strong>🚨 มิจฉาชีพ 96% ครับ! ทริคหลอกพัสดุ</strong>
              <br />- จุดสังเกต: ลิงก์ไม่ใช่โดเมนของขนส่ง + เร่งเวลาให้กด
              <br />- วิธีจัดการ: ห้ามกดลิงก์, บล็อก, แจ้งผู้ให้บริการ
              <br />ส่งข้อความ/รูปอื่นมาได้เลย ผมช่วยดูต่อให้ครับ
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>วิธีทำงานของระบบ</h2>
          <p className={styles.sectionLead}>
            ผู้ใช้ส่งข้อความหรือรูปภาพเข้ามา ระบบจะจัดประเภทอินพุตด้วย
            GPT-4.1-mini ก่อนวิเคราะห์เชิงลึกและส่งคำตอบกลับผ่าน LINE Messaging
            API เฉพาะกรณีที่เกี่ยวข้องกับการตรวจสอบ scammers.
          </p>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <span className={styles.pill}>Step 01</span>
              <div className={styles.cardTitle}>รับอินพุตจากผู้ใช้</div>
              <div className={styles.cardBody}>
                รองรับภาพหน้าจอ, รูปเบอร์โทร, หรือข้อความทั้งก้อนจาก SMS / DM.
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.pill}>Step 02</span>
              <div className={styles.cardTitle}>AI จัดประเภท & วิเคราะห์</div>
              <div className={styles.cardBody}>
                จำแนกเป็น ภาพ / ข้อความ scammers / ไม่เกี่ยวข้อง จากนั้นคำนวณ
                คะแนนความเสี่ยง พร้อมระบุจุดสังเกตสำคัญ.
              </div>
            </div>
            <div className={styles.card}>
              <span className={styles.pill}>Step 03</span>
              <div className={styles.cardTitle}>ตอบกลับอย่างปลอดภัย</div>
              <div className={styles.cardBody}>
                ส่งคำแนะนำแบบเข้าใจง่ายผ่าน LINE OA พร้อมแนวทางป้องกันที่ทำได้ทันที.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>สัญญาณที่ระบบจับตา</h2>
          <p className={styles.sectionLead}>
            มุ่งเน้นรูปแบบหลอกลวงที่พบบ่อย เช่น พัสดุ, ลงทุน, romance scam
            รวมถึงรูปภาพที่แอบอ้างหรือปลอมแปลง.
          </p>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>ข้อความหลอกลงทุน</div>
              <div className={styles.cardBody}>
                สัญญาผลตอบแทนสูงเกินจริง, เร่งโอน, ส่งลิงก์แปลกปลอม.
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Romance / Social Scam</div>
              <div className={styles.cardBody}>
                ขอข้อมูลส่วนตัว, ชวนคุยหวานๆ เร็วผิดปกติ หรือกดดันให้โอนเงิน.
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>ภาพหน้าจอ & เบอร์โทร</div>
              <div className={styles.cardBody}>
                ตรวจรูปที่แคปมาจากแชท, สลิป, หรือภาพเบอร์โทรที่น่าสงสัย.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>แนวทางตอบกลับอัตโนมัติ</h2>
          <p className={styles.sectionLead}>
            ระบบจะตอบกลับเฉพาะกรณีที่เกี่ยวข้องกับ scammers เพื่อไม่รบกวนผู้ใช้
            และลดข้อความซ้ำซ้อนจากการคุยทั่วไป.
          </p>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>ตอบกลับเมื่อ</div>
              <div className={styles.cardBody}>
                ตรวจพบข้อความหลอกลวง, ลิงก์น่าสงสัย, หรือรูปที่เข้าข่าย scam.
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>ไม่ตอบกลับเมื่อ</div>
              <div className={styles.cardBody}>
                เป็นคำถามทั่วไป, แชทซ้ำ, หรือข้อความที่ไม่ได้เกี่ยวข้องกับการตรวจสอบ.
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>พร้อมเชื่อมต่อสำหรับทีมพัฒนา</h2>
          <p className={styles.sectionLead}>
            ระบบหลังบ้านรันบน Next.js และเปิด webhook สำหรับ LINE OA แล้ว
            เพียงตั้งค่า ENV เพื่อเชื่อม OpenAI และ LINE ก็พร้อมใช้งาน.
          </p>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Webhook Endpoint</div>
              <div className={styles.cardBody}>
                ใช้เส้นทาง /api/line/webhook สำหรับรับข้อความจาก LINE Messaging API.
              </div>
              <div className={styles.divider} />
              <div className={styles.cardBody}>
                ระบบตรวจลายเซ็น, ดึงรูปจาก LINE, และส่งคำตอบกลับอัตโนมัติ.
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Environment Variables</div>
              <div className={styles.cardBody}>
                OPENAI_API_KEY, LINE_CHANNEL_SECRET, LINE_CHANNEL_ACCESS_TOKEN
              </div>
              <div className={styles.divider} />
              <div className={styles.cardBody}>
                สามารถปรับโทนคำตอบหรือ prompt ได้ในไฟล์ backend.
              </div>
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          ScamShield Alliance — สร้างสังคมที่รู้ทันภัย scammers และช่วยกันแชร์ความเสี่ยงอย่างปลอดภัย
        </div>
      </main>
    </div>
  );
}
