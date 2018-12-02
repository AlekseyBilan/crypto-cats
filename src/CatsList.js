import React, {Component, Fragment} from 'react';
import Avatar from "./Avatar";

export default class CatsList extends Component {
    constructor(){
        super();
    }
    render() {
        let {index, prevCatGeneration, cat} = this.props;
        return <Fragment>
                    ( prevCatGeneration === cat.generation ) ? (
                        <tr key={index + cat.generation}>
                            <td className="generation" colSpan={3}>
                                Generation {cat.generation}
                            </td>
                        </tr>
                    <Fragment>
                        <tr key={cat.id}>
                        <td key={cat.id}>
                        <Avatar src = {cat.image_url}/>
                    {   cat.name || 'a cat'}
                        </td>
                        <td>{Number(cat.auction.start_price.slice(0, 5)).toFixed(2)} $</td>
                        <td className="buy-btn-wrap">
                        <button>Buy</button>
                        </td>
                        </tr>
                    </Fragment>
                    ) : null
                </Fragment>

    }
}