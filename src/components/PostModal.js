import React, { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import firebase from "firebase";
import {useSelector, useDispatch} from 'react-redux';
import { postArticleApi} from '../actions'

const PostModal = (props) => {
    const user = useSelector(state=>state.userState.user)
    const dispatch = useDispatch();
    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const editorChangeHandler = (event) => {
        setEditorText(event.target.value);
    };

    const handleShareImage = (event) => {
        const image = event.target.files[0];
        if (image === undefined || image === "") {
            alert(`This is not an Image, This is ${typeof image}`);
            return;
        }
        setShareImage(image);
    };

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);
    };

    const postArticle = (event)=>{
        event.preventDefault();
        if(event.target !== event.currentTarget){
            return;
        }
        const payload= {
            image: shareImage,
            video: videoLink,
            user: user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now(),
        }
        props.onClose()
        dispatch(postArticleApi(payload))
    }

    return (
        <Container>
            <Content>
                <Header>
                    <h2>Create a Post</h2>
                    <button onClick={props.onClose}>
                        <img src="/images/close-icon.svg" alt="" />
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                    {user && user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="userPhoto"
                                    ></img>
                                ) : (
                                    <img src="/images/user.svg" alt="" />
                                )}
                        <span>{user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea
                            value={editorText}
                            onChange={editorChangeHandler}
                            placeholder="What do you want to talk about?"
                            autoFocus={true}
                        />
                        {assetArea === "image" && (
                            <UploadImage>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    id="image"
                                    style={{ display: "none" }}
                                    onChange={handleShareImage}
                                />
                                <p>
                                    <label htmlFor="image">
                                        Select an Image to Share
                                    </label>
                                </p>
                                {shareImage && (
                                    <img
                                        src={URL.createObjectURL(shareImage)}
                                        alt=""
                                    />
                                )}
                            </UploadImage>
                        )}
                        {assetArea === "media" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Please enter a video link"
                                    value={videoLink}
                                    onChange={(e) =>
                                        setVideoLink(e.target.value)
                                    }
                                />
                                {videoLink && (
                                    <ReactPlayer
                                        width={"100%"}
                                        url={videoLink}
                                    />
                                )}
                            </>
                        )}
                    </Editor>
                </SharedContent>
                <SharedCreation>
                    <AttachAssets>
                        <AssetButton onClick={()=>switchAssetArea('image')}>
                            <img src="/images/shared-image.svg" alt="" />
                        </AssetButton>
                        <AssetButton onClick={()=>switchAssetArea('media')}>
                            <img src="/images/shared-video.svg" alt="" />
                        </AssetButton>
                    </AttachAssets>
                    <ShareComment>
                        <AssetButton>
                            <img src="/images/shared-comment.svg" alt="" />
                            Anyone
                        </AssetButton>
                    </ShareComment>
                    <PostButton onClick={postArticle}>post</PostButton>
                </SharedCreation>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    color: black;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`;

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.15);
        border: none;
        outline: none;
        border-radius: 50%;
        svg,
        img {
            pointer-events: none;
        }
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg,
    img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border-radius: 50%;
        border: 2px solid transparent;
    }

    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`;

const SharedCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    cursor: pointer;
`;

const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton} {
        width: 40px;
    }
`;

const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton} {
        svg {
            margin-right: 5px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: #0a66c2;
    color: #fff;
    cursor: pointer;

    &:hover {
        background: #004182;
    }
`;

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`;

const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;
    }
`;

export default PostModal;
