import React, { useState, useCallback } from 'react'
import debounce from 'lodash.debounce'
const GIPHY = require('giphy-api')('IJUvpfn29tLaHTsD4MbDGLoWo7HCq2zN')

export default function GiphySearch () {
    const [giphyResults, setGiphyResult] = useState([])

    const callGiphyAPI = async function (value) {
        const giphys = await GIPHY.search(value)
        const giphysSimpsons = await GIPHY.search(value + " simpsons")
        const giphysTheOffice = await GIPHY.search(value + " the office")

        const firstGiphy = giphys.data[0]
        const firstgiphysSimpsons = giphysSimpsons.data[0]
        const firstgiphysTheOffice = giphysTheOffice.data[0]

        const result = [firstGiphy, firstgiphysSimpsons, firstgiphysTheOffice]
        setGiphyResult(result)

    }

    const debounceOnChange = useCallback(debounce(callGiphyAPI, 1000), [])

    return (
        <div style={{display: 'flex', flexFlow: 'column', }}>
            <div style={ {margin: '30px'}}>
                <form>
                    <label>
                    Search Giphy:
                    <input style={ {marginLeft: '10px', padding: '10px'}} type="text" id='search-input' name="name" onChange={e => debounceOnChange(e.target.value)} />
                    </label>
                </form> 
            </div>  
            {giphyResults.length >= 3 && <div style={{display: 'flex'}}>
                {giphyResults.map(r => <div>
                    <img key={r.id} src={r.images.downsized_large.url} alt={r.title} />
                </div>)}
            </div>}
        </div>
    ) 
}