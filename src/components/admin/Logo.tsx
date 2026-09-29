export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <img src="https://www.biebrza24.pl/wp-content/uploads/2022/05/Logo-200.png" alt="" width={120} height={40} referrerPolicy="no-referrer" />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.6 }}>Panel recepcji</div>
      </div>
    </div>
  )
}
