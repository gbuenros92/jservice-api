const Question = ({ triviaData }) => {
    return (
        <div className="box-style">
            <h1 className="points">{triviaData.points}</h1>
            <h2 id="category-txt">{triviaData.category}</h2>
            <h1 className="qna-txt">{triviaData.question}</h1>
        </div>
    );
}

export default Question;
