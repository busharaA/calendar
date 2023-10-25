export interface IData {
    sha: string;
    node_id: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: string;
        }
        committer: object;
        message: string; 
        tree: object;
        url: string;
        comment_count: number;
        verification: object;
    },
    url: string;
    html_url: string;
    comments_url: string;
    author: object;
    commiter: object;
    parents: [];
}