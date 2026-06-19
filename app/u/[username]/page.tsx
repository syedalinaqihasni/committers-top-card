
import { getRanks } from '@/lib/rank';
import { format } from "date-fns";

export default async function Page({ params, searchParams }: any) {
  const p = await params;
  const s = await searchParams;

  const username = p.username;
  const country = s.country || 'pakistan';

  const r = await getRanks(username, country);

  return (
    <main style={{
      minHeight: '100vh',
      background: '#1f1f1f',
      color: 'white',
      padding: '40px',
      fontFamily: 'Arial'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: 'auto',
        background: '#2a2a2a',
        padding: '30px',
        borderRadius: '16px'
      }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <img src={`https://github.com/${username}.png`} width="140" style={{ borderRadius: '12px' }} />
          <div>
            <h1>{username}</h1>
            <p>{r.country}</p>
            <p>Last Updated: {format(new Date(r.updated), "PPPpp")}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <Card title="All Time" rank={r.allCount} total={r.totalAll} />
          <Card title="Public" rank={r.publicCount} total={r.totalPublic} />
          <Card title="Private" rank={r.privateCount} total={r.totalPrivate} />
        </div>
        <div style={{
          margin: 'auto',
          paddingTop: '20px',
        }}>

          Powered by <a href='https://committers.top/'>Committers.top</a>
        </div>
      </div>
    </main>
  )
}

function Card({ title, rank, total }: any) {
  return (
    <div style={{
      flex: 1,
      background: '#333',
      padding: '20px',
      borderRadius: '12px'
    }}>
      <h3>{title}</h3>
      <h1>#{rank ?? 'N/A'}</h1>
    </div>
  )
}
