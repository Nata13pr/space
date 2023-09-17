export default function List ({launches}){
    return (
<div>
    {launches.map((launch)=>{
        return (<div>{launch}</div>)
    })}
</div>
    )

}