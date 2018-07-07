import React from "react";
import CardEditor from "./CardEditor";
import uuid from "uuid-v4";
import { Transition } from "react-spring";
import LabelsQuery from "../Apollo/LabelsQuery";
import AddCardMutation from "../Apollo/AddCardMutation";
import AddLabelMutation from "../Apollo/AddLabelMutation";

export default class extends React.Component {
  state = {
    creationKey: uuid()
  };

  menuPortal = null;

  setMenuPortal = element => {
    this.menuPortal = element;
    this.forceUpdate();
  };

  render() {
    return (
      <LabelsQuery>
        {({ data: { labels }, client, loadingLabels }) => {
          if (loadingLabels || !labels) return "loading";

          const selectableLabels = labels.edges.map(({ node: label }) => label);

          return (
            <React.Fragment>
              <AddCardMutation client={client}>
                {createCard => (
                  <AddLabelMutation>
                    {createLabel => (
                      <CardEditor
                        key={this.state.creationKey}
                        initialMode="creation"
                        handleSubmit={(values, resetForm) => {
                          createCard({
                            variables: {
                              sentence: values.question,
                              answer: values.response,
                              labels: values.labels.map(label => label.id),
                              clientMutationId: "mutationId"
                            }
                          });
                          resetForm();
                        }}
                        handleLabelCreate={name =>
                          createLabel({
                            variables: {
                              name: name,
                              clientMutationId: "mutationId"
                            }
                          })
                        }
                        menuPortal={this.menuPortal}
                        selectableLabels={selectableLabels}
                      />
                    )}
                  </AddLabelMutation>
                )}
              </AddCardMutation>
              <div ref={this.setMenuPortal} />
            </React.Fragment>
          );
        }}
      </LabelsQuery>
    );
  }
}
