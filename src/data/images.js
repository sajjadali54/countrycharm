let obj = {
  All: [
    "https://foodish-api.herokuapp.com/images/dosa/dosa52.jpg",
    "https://foodish-api.herokuapp.com/images/biryani/biryani14.jpg",
    "https://foodish-api.herokuapp.com/images/burger/burger36.jpg",
  ],
  Food: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XUOlFc-3P_ugA6EGN25CnxFDILJYXCyRfA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XUOlFc-3P_ugA6EGN25CnxFDILJYXCyRfA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XUOlFc-3P_ugA6EGN25CnxFDILJYXCyRfA&s",
  ],
  Hotel: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzvTGek_MNBj_tU2c9Olt3DC2wA3uC4x-XIEsz72y0&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn6KZH2jiqGEzrxOTBpXVzKkKEVZXHbcBqBClwkyQY&s",
    "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWxzfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6TDTZSs8CSIVCgBSw2Pb3HFkREHnPOuG2w4jWXevThGVynZiTA2quQXyvj4eAIEM_FcE&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsnre36prJ5yHMCneIQ6PUTghAG_1KPnHwdd39hXieStHUy-cnEwmpBFOUL6f5w80A-fk&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkNpZaCJm_NqpCBnLYfaORoWal77uW2BNPpTHF0HJkP4QCYa3DRHjzOxNQ2zhm592AxGc&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwNHL3cXCRjxyK3cBrsEIAL8uoDf7X8qgRk0W6rdfBLkGatRv_kR8eFJUBrZyylZR1uaE&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3LjxkS4-NRzWXl8oL5mMZAmfmJxRgtpQWjfq_Air0&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6NIzsI50mVn7SorH24Zm4vmv47O1TvCNIWtuDS6kG3E7q9y5JpV-99bY2NsscBblRmUw&usqp=CAU",
    "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg",
  ],
  Place: [
    "https://hips.hearstapps.com/hmg-prod/images/great-ocean-road-174028267-1494616481.jpg?crop=0.888888888888889xw:1xh;center,top&resize=768:*",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxhY2V8ZW58MHx8MHx8fDA%3D",
  ],
};

export default function getImage(id, cat) {
  let img = obj[cat][Math.floor(Math.random() * 10)];

  return img;
}
