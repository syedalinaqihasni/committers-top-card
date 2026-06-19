
export async function getRanks(username:string,country:string){
 const res=await fetch(`https://committers.top/rank_only/${country}.json`,{cache:'no-store'});
 const data=await res.json();

 const find=(arr:string[])=>{
   const idx=arr.findIndex(x=>x.toLowerCase()===username.toLowerCase());
   return idx>=0?idx+1:null;
 };

 return {
   country:data.title,
   updated:data.data_asof,
   all:data.user||[],
   public:data.user_public||[],
   private:data.user_private||[],
   allCount:find(data.user||[]),
   publicCount:find(data.user_public||[]),
   privateCount:find(data.user_private||[]),
   totalAll:(data.user||[]).length,
   totalPublic:(data.user_public||[]).length,
   totalPrivate:(data.user_private||[]).length
 };
}
