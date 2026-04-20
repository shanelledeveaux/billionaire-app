import styles from './Footer.module.css';

const sources = [
  {
    heading: 'Billionaires & earnings',
    items: [
      'Net worth — Forbes Real-Time Billionaires List, 2024',
      'Earnings rate — Forbes annual wealth growth (2023) ÷ seconds per year',
      'Tax model — simplified flat rate on net worth above $1B; Forbes 400 average (~$4.28B) used as per-person baseline',
    ],
  },
  {
    heading: 'Luxury & enterprise',
    items: [
      'Private 747 — Boeing 747-8 VIP list price',
      'Gigayacht — Boat International superyacht market report',
      'Private space trip — Blue Origin / SpaceX reported orbital pricing',
      'NFL franchise — Forbes NFL Team Valuations, 2024 (avg $5.7B)',
      'Nuclear plant — DOE / NRC AP1000 reactor cost estimate',
      'Oil refinery — EIA refinery construction data (300k bbl/day capacity)',
      'Family farms — USDA National Agricultural Statistics Service',
    ],
  },
  {
    heading: 'Housing',
    items: [
      'Median home price — National Association of Realtors, 2024 (~$400k)',
      'Affordable units — HUD construction cost estimates',
      'Veteran homelessness — HUD-VA Annual Homeless Assessment Report, 2023',
      'NYC city block — CBRE Manhattan real estate market data',
    ],
  },
  {
    heading: 'Healthcare',
    items: [
      'Hospital construction — AHA / Deloitte Health (~$100M per hospital)',
      'Insulin costs — KFF Insulin Affordability Report, 2023',
      'Cancer research — NCI FY2024 congressional budget (~$7B/yr)',
      'Dental care — KFF Oral Health Coverage survey; 65M uninsured estimate',
    ],
  },
  {
    heading: 'Education',
    items: [
      'School construction — NCES school facility data',
      'Pell Grants — College Board / US Department of Education',
      'Universal pre-K — NIEER / HHS cost estimates',
      'Student laptops — NCES device data + market pricing (50M K–12 students)',
    ],
  },
  {
    heading: 'Public good & tax programs',
    items: [
      'End world hunger — UN World Food Programme Annual Report, 2023',
      'Free public transit — APTA (American Public Transportation Association)',
      'Solar panels — NREL / SEIA residential installation cost data',
      'Clean water — WHO / UN Sustainable Development Goal cost estimates',
      'Clean energy transition — IRA CBO 10-year budget score',
      'Cyber defense — CISA / OMB federal cybersecurity budget',
      'Roads & bridges — Infrastructure Investment and Jobs Act, CBO analysis',
      'NASA budget — NASA FY2024 Congressional Budget Justification',
      'School lunches — USDA Food and Nutrition Service',
      'Medicaid expansion — KFF / CBO',
      'VA healthcare — VA FY2024 budget request / CBO',
      'Police & fire grants — DOJ COPS program; NFPA national data',
      'Farm & rural support — USDA Farm Service Agency',
    ],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.heading}>Sources & methodology</p>
      <p className={styles.note}>
        All figures are approximations intended to illustrate scale, not precise policy estimates.
        Prices reflect publicly reported data at time of publication.
      </p>
      <div className={styles.grid}>
        {sources.map((group) => (
          <div key={group.heading} className={styles.group}>
            <p className={styles.groupHeading}>{group.heading}</p>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
