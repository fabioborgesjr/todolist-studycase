import React from 'react'

const filter = [{
    id: 'all',
    description: 'Mostrar todos',
    checked: true
},
{
    id: 'done',
    description: 'Somente fechados',
    checked: false
},
{
    id: 'open',
    description: 'Somente abertos',
    checked: false
}
]

const Filters = props => {
    const renderFilter = () => {
        return filter.map((filter, index) => {
            return (
                <div key={index} className="radio-filters">
                    <input className="radio-filters-input" id={filter.id} type="radio" name="filter" defaultChecked={filter.checked ? 'checked' : ''} onClick={props.onClick} />
                    <label>{filter.description}</label>
                </div>
            )
        })
    }

    return (
        <div className="radios">
            {renderFilter()}
        </div>
    )
}

export default Filters