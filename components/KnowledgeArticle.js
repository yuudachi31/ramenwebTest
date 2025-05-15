import React, { useContext, useEffect } from "react";
import { StoreContext } from "../store";

export default function KnowledgeArticle() {
    const { state: { knowledgePage: { article }, requestKnowledge: { loading } } } = useContext(StoreContext);
    let count = 0;

    return (
        <>
            {loading? (
                <div className="loading-div">
                    <img src="/images/loading.gif" alt="loading... " />
                </div>
            ):(
                <div className="know-all">
                    <div className={`know-main know-main-${article.name}`}>
                        <div className="know-sect">{article.sect}</div>
                        <div className="know-detail">{article.text}</div>
                    </div>
                    <div className="know-recommend">
                        {article.recommend.map(tag => (
                            <div key={tag} className="know-tag">{`#${tag}`}</div>
                        ))}
                    </div>
                    <div className="know-anchor">
                        <div className={`know-all-images know-image-${article.name}`}>
                            {article.image.map(url =>{ 
                                count++;
                                return(
                                    <img key={url} className={`know-img-item ${article.name}-img-${count}`} src={url}></img>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
        
    )
}