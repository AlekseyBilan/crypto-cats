import React from 'react';
import Avatar from "./Avatar";

export default function CatItem({isGenerationOpen, cats}) {
        return (isGenerationOpen && cats.map(cat => (
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
                    ))
        )
}