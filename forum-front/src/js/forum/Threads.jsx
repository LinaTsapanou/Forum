import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Accordion, AccordionTab } from "primereact/accordion";
import "../../css/style.css";
import { PostService } from "../services/PostService";

export default class Threads extends Component {
  constructor() {
    super();

    this.postService = new PostService();
    this.state = {
      threads: null,
      posts: null,
      activeIndex: null,
      selectedThread: null,
      selectedCategory: { name: null },
      body: "",
      public: false,
    };

    this.categories = [
      { name: "Question" },
      { name: "Suggestion" },
      { name: "Clarification" },
    ];

    this.onCategoryChange = this.onCategoryChange.bind(this);

    //end of contructor
  }

  onClick(itemIndex) {
    let activeIndex = this.state.activeIndex ? [...this.state.activeIndex] : [];

    if (activeIndex.length === 0) {
      activeIndex.push(itemIndex);
    } else {
      const index = activeIndex.indexOf(itemIndex);
      if (index === -1) {
        activeIndex.push(itemIndex);
      } else {
        activeIndex.splice(index, 1);
      }
    }

    this.setState({ activeIndex });
  }

  onCategoryChange(e) {
    this.setState({ selectedCategory: e.value });
  }

  componentDidMount() {
    this.postService.getAll().then((data) => {
      console.log(data);
      this.setState({ posts: data });
    });
  }

  render() {
    return (
      <div className="row p-4 mt-5 justify-content-center ">
        <div className="col-7 bg-primary rounded-4 d-flex align-middle flex-column p-4 bg-info">
          <div className="fw-bold fst-italic fs-1 text-center text-white mb-3 p-3">
            Forum
          </div>
          <Accordion multiple activeIndex={[0]}>
            <AccordionTab header="Thread 1">
              <DataTable
                value={this.state.posts}
                selectionMode="single"
                //selection={this.state.selectedThread}
                //onSelectionChange={e => this.setState({ selectedThread: e.value })}

                dataKey="id"
                responsiveLayout="scroll"
              >
                <Column field="title" header="TITLE"></Column>
                <Column field="body" header="BODY"></Column>
                <Column field="category" header="CATEGORY"></Column>
              </DataTable>
            </AccordionTab>
            <AccordionTab header="Thread 2">
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </AccordionTab>
            <AccordionTab header="Thread 3">
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                rerum facilis est et expedita distinctio. Nam libero tempore,
                cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
              </p>
            </AccordionTab>
          </Accordion>
          {/* <DataTable
                    value={this.state.threads}
                    selectionMode="single"
                    //selection={this.state.selectedThread}
                    //onSelectionChange={e => this.setState({ selectedThread: e.value })}

                    dataKey="id"
                    responsiveLayout="scroll"
                    >
                        <Column field="t_title" header="Threads"></Column>
                    </DataTable>  */}

          <div className="row p-4 mt-5 justify-content-left">
            <div className="col-5 d-flex flex-column">
              <label className="fs-5 text-white mb-2">Title of new post</label>
              <InputText className="mb-3" />

              <label className="fs-5 text-white mb-2">
                Category of new post
              </label>
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
                onChange={(e) => this.setState({ body: e.target.value })}
                rows={3}
              />

              <label className="fs-5 text-white mb-2">Public</label>
              <InputSwitch
                className="mb-4"
                checked={this.state.public}
                onChange={(e) => this.setState({ public: e.value })}
              />

              <Button
                className="btn btn-md col-4 p-2 text-white btn-primary"
                label="Submit"
                icon="pi pi-check"
              />
            </div>
          </div>

          <div className="bg-light rounded-4 m-4 p-4 mb-1">
            <div class="mb-3">
              <div class="fw-bold fs-4 d-inline p-2 text-dark">Post name</div>
              <div class="d-inline p-2 text-dark">icon</div>
            </div>
            <p>
              Body body body body body body body body body body body body body
              body body body body body body body body body body body body body
              body body
            </p>
          </div>
        </div>
      </div>
    );
  }
}
