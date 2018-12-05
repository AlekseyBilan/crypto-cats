import React, {Component, Fragment} from 'react';
import Avatar from "./Avatar";

export default class Category extends Component {
    state = {
        isOpen: true
    }
    toggleGeneration = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen
        }))
    }
    render(){
        const {title, cats} = this.props;
        return (<Fragment>
                <tr key={title} onClick={this.toggleGeneration} className="category-title">
                    <td className="generation" colSpan={3}>
                        {title}
                    </td>
                </tr>
                {this.state.isOpen && cats.map(cat => (
                    <tr key={cat.id}>
                        <td key={cat.id}>
                            <Avatar src={cat.image_url}/>
                            {cat.name || 'a cat'}
                        </td>
                        <td>{Number(cat.auction.start_price.slice(0, 5)).toFixed(2)} $</td>
                        <td className="buy-btn-wrap">
                            <button>Buy</button>
                        </td>
                    </tr>
                ))}
            </Fragment>
        )
    }
}


