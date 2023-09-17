export default function List ({launches}){
    return (
<div>
    {launches.map((launch)=>{
        return (<div key={launch}>{launch}</div>)
    })}
</div>
    )

}