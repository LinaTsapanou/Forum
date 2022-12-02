import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Accordion, AccordionTab } from "primereact/accordion";
import { PostService } from "../services/PostService";
import { ThreadService } from "../services/ThreadService";
import { Menubar } from "primereact/menubar";
import "../../css/style.css";

export default class Threads extends Component {
  constructor() {
    super();

    this.threadService = new ThreadService();
    this.postService = new PostService();
    this.state = {
      threads: null,
      visible: false,
      posts: null,
      activeIndex: null,

      selectedCategory: { name: null },

      public: false,
      list1: [],
      list2: [],
      list3: [],
    };

    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
    ];

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

      const found = this.state.posts.find((p) => p.thread === "Thread 1");

      this.state.list1 = this.state.list1.concat(found);

      const found2 = this.state.posts.find((p) => p.thread === "Thread 2");

      this.state.list2 = this.state.list2.concat(found2);

      const found3 = this.state.posts.find((p) => p.thread === "Thread 3");

      this.state.list3 = this.state.list3.concat(found3);
    });
  }

  checkTitle() {
    this.postService.save(this.state.posts).then((data) => {
      this.setState({
        visible: false,
        post: {
          title: null,
          category: null,
          body: null,
        },
      });
      console.log(data);
    });
  }
  showSaveDialog() {
    this.setState({
      visible: true,
    });
  }

  render() {
    return (
      <div className="row p-4 mt-5 justify-content-center ">
        <div className="col-7 bg-primary rounded-4 d-flex align-middle flex-column p-4 bg-info">
          <div className="fw-bold fst-italic fs-1 text-center  mb-3 p-3">
            Forum
          </div>

          <Accordion multiple activeIndex={[0]}>
            <AccordionTab header="Thread 1">
              <Menubar model={this.items} />
              <DataTable
                value={this.state.list1}
                dataKey="id"
                responsiveLayout="scroll"
              >
                <Column field="title" header="TITLE"></Column>
                <Column field="body" header="BODY"></Column>
                <Column field="category" header="CATEGORY"></Column>
              </DataTable>
            </AccordionTab>

            <AccordionTab header="Thread 2">
              <Menubar model={this.items} />
              <DataTable
                value={this.state.list2}
                dataKey="id"
                responsiveLayout="scroll"
              >
                <Column field="title" header="TITLE"></Column>
                <Column field="body" header="BODY"></Column>
                <Column field="category" header="CATEGORY"></Column>
              </DataTable>
            </AccordionTab>

            <AccordionTab header="Thread 3">
              <Menubar model={this.items} />
              <DataTable
                value={this.state.list3}
                dataKey="id"
                responsiveLayout="scroll"
              >
                <Column field="title" header="TITLE"></Column>
                <Column field="body" header="BODY"></Column>
                <Column field="category" header="CATEGORY"></Column>
              </DataTable>
            </AccordionTab>
          </Accordion>

          <Dialog
            header="Create post"
            visible={this.state.visible}
            onHide={() => {
              this.setState({ visible: false });
            }}
            breakpoints={{ "960px": "75vw", "640px": "100vw" }}
            style={{ width: "50vw" }}
            footer={this.footer}
          >
            <div className="row p-4 mt-5 justify-content-left ">
              <div className="col-5 d-flex flex-column">
                <label className="fs-5  mb-2">Title of new post</label>
                <InputText
                  className="mb-3"
                  id="title"
                  name="title"
                  value={this.state.name}
                  onChange={(event) => {
                    let val = event.target.value;
                    this.setState((prevState) => {
                      let post = Object.assign({}, prevState.post);
                      post.name = val;
                      return { post };
                    });
                  }}
                />

                <Button
                  className="btn btn-md col-4 p-2  btn-primary"
                  label="Submit"
                  icon="pi pi-check"
                  onClick={this.checkTitle}
                />
              </div>
            </div>
          </Dialog>

          <label className="fs-5  mb-2">Category of new post</label>
          <Dropdown
            className="mb-3"
            optionLabel="name"
            value={this.state.selectedCategory}
            options={this.categories}
            onChange={this.onCategoryChange}
            placeholder="Category"
          />

          <label className="fs-5  mb-2">Body of new post</label>
          <InputTextarea
            className="mb-4"
            id="textarea"
            value={this.state.body}
            onChange={(e) => this.setState({ body: e.target.value })}
            rows={3}
          />

          <label className="fs-5  mb-2">Public</label>
          <InputSwitch
            className="mb-4"
            checked={this.state.public}
            onChange={(e) => this.setState({ public: e.value })}
          />
          {/* Post info */}
          {/* <div className="bg-light rounded-4 m-4 p-4 mb-1">
            <div class="mb-3">
              <div className="fw-bold fs-4 d-inline p-2 text-dark">
                Post name
              </div>
              <i className="d-inline p-2 text-dark pi pi-question-circle"></i>
              <i className="d-inline p-2 text-dark pi pi-volume-up"></i>
              <i className="d-inline p-2 text-dark pi pi-pencil"></i>
            </div>
            <p>
              Body body body body body body body body body body body body body
              body body body body body body body body body body body body body
              body body
            </p>
          </div> */}
        </div>
      </div>
    );
  }
}
