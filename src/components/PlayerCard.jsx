// PlayerCard.js
import PropTypes from 'prop-types';
import { Batsman, Bowler, WicketKeeper, AllRounder, Franchise, Age, BlankGuess} from '../utils/design';
import { CountryFlag } from '../utils/TeamDesign';
const PlayerCard = ({ player, hero, isGuessed}) => (
    
  <div className={`bg-design-white w-20 md:w-32 text-xs md:text-base rounded-xl inter border design-text design-border ${isGuessed ? 'bg-blue-500 text-gray-600' : 'bg-gray-200' }`}>
    <div className="bg-head p-1 mb-2 rounded-t-xl">
      <h3 className="text-base font-bold inline-block">{}</h3>
    </div>
    <div>
        {/* <h3 className="inline-block h-8">{hero.role === 'BT' ? <Batsman /> : hero.role === 'BW' ? <Bowler /> : hero.role === 'AR' ? <AllRounder />: <WicketKeeper />}</h3>
        <p className='text-xs font-black design-text-value my-4 '>{hero.role === 'BT' ? "BATSMAN" : hero.role === 'BW' ? "BOWLER" : hero.role === 'AR' ? "ALL ROUNDER": "WICKET KEEPER"}</p> */}
    </div>
    <div className="mb-3 inline-block text-center">
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Franchise team={player.franchise} />
        <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className='text-xs design-text-value font-bold inter'>{player.franchise || 'TEAM'}</p>
    </div>
</div>
    <div className="inline-block mr-2 text-2xl text-center pl-2 mb-3">
        <Age />
      {/* <FaUser className="inline-block mr-2 text-2xl" /> */}
      <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className='text-xs design-text-value font-bold inter'>{player.age || 'AGE'}</p>
    </div>
    <div className=" inline-block text-center">
        <CountryFlag country={player.country} />
        <p style={{ marginLeft: '5px', marginRight: '5px', marginTop:'-15px' }}className='text-xs design-text-value font-bold inter'>{player.country || 'COUNTRY'}</p>
    </div>
    <div className={`bg-head px-4 w-32 mt-2 py-1 rounded-b-xl`}>
            <h3 className={`text-base font-bold inline-block`}>{player.playerName? (<>
            <span className='text-xs'>{player.playerName.split(' ')[0]}</span>{' '} <br />
            <span className='text-base font-bold'>{player.playerName.split(' ')[1]}</span>
        </>) :<BlankGuess />}</h3>
        </div>
  </div>
);

PlayerCard.propTypes = {
  player: PropTypes.shape({
    country: PropTypes.string,
    franchise: PropTypes.string,
    age: PropTypes.string,
    jerseyNumber: PropTypes.string,
    playerName: PropTypes.string,
  }).isRequired,
  hero: PropTypes.shape({
    price: PropTypes.string.isRequired,
    role: PropTypes.string,
  }).isRequired,
  isGuessed: PropTypes.bool.isRequired
};

export default PlayerCard;
