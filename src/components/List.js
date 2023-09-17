export default function List ({launches}){
    return (
<div>
    {launches.map((launch)=>{
        return (<div key={launch.id}>{launch.name}</div>)
    })}
</div>
    )

}