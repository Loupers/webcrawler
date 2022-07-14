import { INode, Node } from "./model";
import { data } from "./testData";

const url = "http://nasold.piroutek.eu:4001/graphql";

export class ServiceGraphql {

    static async getNodes(recordIds: number[]): Promise<Node[] | null> {
        // return [];
        var query = `{
            nodes(websites: [`;
        for (var id of recordIds) {
            query += '"' + id + '", ';
        };
            
        query += `]) {
              title
              url
              crawlTime
              owner {
                identifier
              }
              links {
                url
              }
            }
          }`;
        try {
            var response = await fetch(url + "?query=" + query);
            var parsed = await response.json();
            if (!parsed) return null;
            var inodes: INode[] = parsed.data.nodes;
            return inodes.map(nodeObj => new Node(nodeObj));
        } catch(error) {
            console.log(error);
            return null;
        }
        
    }
    

    private static getNodesTest() {
        var nodes: INode[] = data.data.nodes;
        return nodes.map(nodeObj => new Node(nodeObj));
    }
}