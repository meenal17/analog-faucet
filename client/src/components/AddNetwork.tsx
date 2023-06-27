import { addNetwork, addAsset } from "./Metamask"

export default function AddNetwork(props: any) {
    console.log(props.config,"hello im testing::::");
    
    return (
        <div className='footer-buttons'>
            <div className="">
            <button className="add-network" onClick={() => {addNetwork(props.config)}}>
                <img alt='metamask' style={{width: "25px", height: "25px", marginRight: "5px"}} src="/memtamask.webp"/>
                Add Testnet to Metamask
            </button>
            </div>
            <div className="">
            <button className="add-network" onClick={() => {window.open(`${props.config.EXPLORER}${props.token?.CONTRACTADDRESS ? "/address/" + props.token.CONTRACTADDRESS : ""}`, '_blank')}}>
                <img alt="block-explorer" style={{width: "25px", height: "25px"}} src="/fav.png"/>
                View Global Explorer
            </button>
            </div>

            {
                props?.token?.CONTRACTADDRESS
                &&
                <div className="">
                <button className="add-network" onClick={() => {addAsset(props?.token)}}>
                    <img alt='asset' style={{width: "25px", height: "25px", marginRight: "5px", borderRadius: "25px"}} src={props?.token?.IMAGE}/>
                    Add Asset to Metamask
                </button>
                </div>
            }
        </div>
    )
}