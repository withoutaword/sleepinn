import { sql } from "@vercel/postgres";

const hasDb = !!process.env.POSTGRES_URL;
let initialized = false;

export async function initDb() {
  if (!hasDb || initialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS page_views (
      id SERIAL PRIMARY KEY,
      ip VARCHAR(45) NOT NULL,
      path VARCHAR(255) NOT NULL,
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS button_clicks (
      id SERIAL PRIMARY KEY,
      button_type VARCHAR(50) NOT NULL,
      ip VARCHAR(45),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;
  initialized = true;
}

export async function recordPageView(ip: string, path: string, userAgent: string) {
  if (!hasDb) return;
  await initDb();
  await sql`INSERT INTO page_views (ip, path, user_agent) VALUES (${ip}, ${path}, ${userAgent})`;
}

export async function recordClick(buttonType: string, ip: string) {
  if (!hasDb) return;
  await initDb();
  await sql`INSERT INTO button_clicks (button_type, ip) VALUES (${buttonType}, ${ip})`;
}

export async function getStats() {
  if (!hasDb) {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      totalBookingClicks: 0,
      totalPhoneClicks: 0,
      dailyViews: [],
      dailyClicks: [],
      recentVisitors: [],
    };
  }

  await initDb();

  const totalViews = await sql`SELECT COUNT(*) as count FROM page_views`;
  const uniqueVisitors = await sql`SELECT COUNT(DISTINCT ip) as count FROM page_views`;
  const totalBookingClicks = await sql`SELECT COUNT(*) as count FROM button_clicks WHERE button_type = 'booking'`;
  const totalPhoneClicks = await sql`SELECT COUNT(*) as count FROM button_clicks WHERE button_type = 'phone'`;

  const dailyViews = await sql`
    SELECT DATE(created_at) as date, COUNT(*) as count
    FROM page_views
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date DESC
  `;

  const dailyClicks = await sql`
    SELECT DATE(created_at) as date,
      SUM(CASE WHEN button_type = 'booking' THEN 1 ELSE 0 END) as booking,
      SUM(CASE WHEN button_type = 'phone' THEN 1 ELSE 0 END) as phone
    FROM button_clicks
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date DESC
  `;

  const recentVisitors = await sql`
    SELECT ip, path, user_agent, created_at
    FROM page_views
    ORDER BY created_at DESC
    LIMIT 50
  `;

  return {
    totalViews: Number(totalViews.rows[0].count),
    uniqueVisitors: Number(uniqueVisitors.rows[0].count),
    totalBookingClicks: Number(totalBookingClicks.rows[0].count),
    totalPhoneClicks: Number(totalPhoneClicks.rows[0].count),
    dailyViews: dailyViews.rows,
    dailyClicks: dailyClicks.rows,
    recentVisitors: recentVisitors.rows,
  };
}
