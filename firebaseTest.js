const { initializeApp } = require("firebase/app");
const {
  getDatabase,
  ref,
  child,
  orderByChild,
  equalTo,
  query,
  onChildAdded,
  onChildChanged,
  onValue,
} = require("firebase/database");

const firebaseUrl = "leaguestat-b9523.firebaseio.com";
const firebaseToken = "uwM69pPkdUhb0UuVAxM8IcA6pBAzATAxOc8979oJ";

const firebaseConfig = {
  apiKey: "AIzaSyBVn0Gr6zIFtba-hQy3StkifD8bb7Hi68A",
  databaseURL: firebaseUrl,
};

var todaysDate = new Date();
var getYear = todaysDate.getFullYear();
var theMonth = todaysDate.getMonth() + 1;
var getMonth = theMonth < 10 ? "0" + theMonth.toString() : theMonth.toString();
var getDay =
  todaysDate.getDate() < 10
    ? "0" + todaysDate.getDate().toString()
    : todaysDate.getDate().toString();
var subscribeDate = getYear + "-" + getMonth + "-" + getDay;
// console.log("subscribing to", { subscribeDate });

const app = initializeApp(firebaseConfig);

// console.log(app);
const db = getDatabase(app);
const dbRef = ref(db);

const fbPubClockRef = child(dbRef, "/svf/ahl/publishedclock/1/games/");
const fbRunningClocksRef = child(dbRef, "/svf/ahl/runningclock/games/");
const fbGoalSummary = child(dbRef, "/svf/ahl/goalssummary/1/games/");

// const fbPubClockUpdate = (snapshot) => {
//   console.log("got snapshot update", snapshot.toJSON());
// };

// onValue(
//   query(fbGoalSummary, equalTo(subscribeDate), orderByChild("DatePlayed")),
//   (snapshot) => {
//     // console.log('got goal summary value', snapshot.toJSON());
//     // console.log(
//     //   Object.entries(snapshot.val()).flatMap(([k, v]) => v.PeriodsInfo)
//     // );
//   }
// );

/*

{
  goaliechanges: { '1': { games: [Object] } },
  goals: { '1': { games: [Object] } },
  goalssummary: { '1': { games: [Object] } },
  mvps: { '1': { games: [Object] } },
  penalties: { '1': { games: [Object] } },
  penaltiessummary: { '1': { games: [Object] } },
  publishedclock: { '1': { games: [Object] } },
  shotssummary: { '1': { games: [Object] } }
}
*/

// /svf/ahl/goals/1/games/{gameId}
onValue(query(child(dbRef, "/svf/ahl")), (snapshot) => {
  console.log(snapshot.toJSON());
})

// onValue(query(child(dbRef, "/svf/ahl/goals/1/games/1025167")), (snapshot) => {
//   console.log(snapshot.toJSON());
// });

// onValue(query(fbPubClockRef, orderByChild('DatePlayed')), (snapshot) => {
//   console.log('got published clock snapshot', snapshot.toJSON())
// })

// onValue(fbPubClockRef, (snapshot) => {
//   console.log("got snapshot", snapshot.toJSON());
// });

// const fbClockSubscribe = (date) => {
//   const fbPubClockDateFilteredRef = query(
//     fbPubClockRef,
//     equalTo(date),
//     orderByChild("DatePlayed")
//   );
//   onChildAdded(fbPubClockDateFilteredRef, fbPubClockUpdate);
//   onChildChanged(fbPubClockDateFilteredRef, fbPubClockUpdate);
// };

// fbClockSubscribe(subscribeDate);
