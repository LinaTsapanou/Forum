import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default class Thread extends Component {

    constructor(props) {
        super(props);


    }

    render() {

        return (

            <DataTable
            value={this.props.posts}
            // selection={this.state.selectedFlight}
            // onSelectionChange={e => this.setState({ selectedFlight: e.value })}
            dataKey="id"
            responsiveLayout="scroll"
            >
                <Column field="title" header="Title"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="body" header="Body"></Column>
            </DataTable> 

        )
    
    }

}