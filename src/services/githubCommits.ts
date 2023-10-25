import { getResource } from "../adapters/xhr/axios";
import { API_COMMITS } from "../helpers/constants/githubEndpoint";
import { ICommit } from "../helpers/interfaces/ICommit";
import { IData } from "../helpers/interfaces/IData";

export const githubCommits = async (): Promise<ICommit[]> => {
    const commits: ICommit[] = [];
    const fillCommits = (commitObject: IData): void => {
        if (commitObject) {
            commits.push({
                name: commitObject.commit.author.name,
                date: commitObject.commit.author.date,
                message: commitObject.commit.message,
            })
        }
    };

    try {
        const response = await getResource(API_COMMITS);
        for (const commit of response.data) {
            fillCommits(commit);
        }
            
    } catch (error) {
        console.error(error);
    }

    return commits;
}