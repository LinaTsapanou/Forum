import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';



export default class Threads extends Component {

    constructor() {
        super();

        this.state = {
            threads: [
                { t_title:"thread1"}, // 4 posts
                { t_title:"thread2"}, // 1 posts
                { t_title:"thread3"}, // 0 posts
                { t_title:"thread4"}  // 3 posts
            ],

            posts: [
                { thread:"thread1", title:"post1", category:"question", body:"bodyyyy"},
                { thread:"thread1", title:"post2", category:"suggestion", body:"bodyyyyyyyyy"},
                { thread:"thread1", title:"post3", category:"clarification", body:"bodyyyyyy"},
                { thread:"thread1", title:"post4", category:"clarification", body:"bodyyyy"},
                { thread:"thread2", title:"post1", category:"suggestion", body:"bodyyyyyyyy"},
                { thread:"thread4", title:"post1", category:"suggestion", body:"bodyyyyyyyyyyyyyy"},
                { thread:"thread4", title:"post2", category:"clarification", body:"bodyyy"},
                { thread:"thread4", title:"post3", category:"question", body:"bodyyyyyyyyyyyyyyy"},
            ],

            selectedThread: null,
            selectedCategory: { name: null },
            body: '',
            public: false,

        };

        this.categories = [
            { name: "Question" },
            { name: "Suggestion"},
            { name: "Clarification"}
        ];

        this.onCategoryChange = this.onCategoryChange.bind(this);

    }

    onCategoryChange(e) {
        this.setState({ selectedCategory: e.value });
    }

    // componentDidMount() {
    //     this.productService.getProductsSmall().then(data => this.setState({ products: data }));
    // }


    render() {

        return (

            <div className="row p-4 mt-5 justify-content-center ">
                <div className="col-7 bg-primary rounded-4 d-flex align-middle flex-column p-4 bg-info">
                    <div className="fw-bold fst-italic fs-1 text-center text-white mb-3 p-3">Forum</div>
                    
                    <DataTable
                    value={this.state.threads}
                    selectionMode="single"
                    //selection={this.state.selectedThread}
                    //onSelectionChange={e => this.setState({ selectedThread: e.value })}

                    dataKey="id"
                    responsiveLayout="scroll"
                    >
                        <Column field="t_title" header="Threads"></Column>
                    </DataTable> 

                    <div className="row p-4 mt-5 justify-content-left">
                        <div className="col-5 d-flex flex-column">
                            <label className="fs-5 text-white mb-2">Title of new post</label>
                            <InputText className="mb-3"/>
                            
                            <label className="fs-5 text-white mb-2">Category of new post</label>
                            <Dropdown
                                className="mb-3"
                                optionLabel="name"
                                value={this.state.selectedCategory}
                                options={this.categories}
                                onChange={this.onCategoryChange}
                                placeholder="Category"
                            />
                            
                            <label className="fs-5 text-white mb-2">Body of new post</label>
                            <InputTextarea
                                className="mb-4"
                                id="textarea"
                                value={this.state.body}
                                onChange={(e) => this.setState({ body: e.target.value })} rows={3}
                            />

                            <label className="fs-5 text-white mb-2">Public</label>
                            <InputSwitch
                            className="mb-4"
                                checked={this.state.public}
                                onChange={(e) => this.setState({ public: e.value })} />
                            
                            <Button className="btn btn-md col-4 p-2 text-white btn-primary" label="Submit" icon="pi pi-check" />


                        </div>
                    </div>



                    <div className="bg-light rounded-4 m-4 p-4 mb-1">
                        <div class="mb-3">
                            <div class="fw-bold fs-4 d-inline p-2 text-dark">Post name</div>
                            <div class="d-inline p-2 text-dark">icon</div>
                        </div>
                        <p>Body body body body body body body body body body body body body body body body body body body body body body body body body body body body</p>
                    </div>

                    




        



                </div>
            </div>    

        )
    }

}