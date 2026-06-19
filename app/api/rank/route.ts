
import {NextResponse} from 'next/server';
import {getRanks} from '@/lib/rank';

export async function GET(req:Request){
 const {searchParams}=new URL(req.url);
 const user=searchParams.get('user')||'';
 const country=searchParams.get('country')||'pakistan';
 return NextResponse.json(await getRanks(user,country));
}
