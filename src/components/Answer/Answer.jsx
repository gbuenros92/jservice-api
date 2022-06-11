const Answer = ({ triviaData }) => {
    return (
        <div className="box-style">
            <h1 className="qna-txt answer-txt">{triviaData.answer}</h1>
        </div>
    );
}

export default Answer;
