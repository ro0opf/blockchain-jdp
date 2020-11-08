# blockchain-jdp
SK Hynix JDP 환경성과 기여에 따른 Reward 제공

- 백엔드 API
- [프론트엔드 화면 설계](https://www.figma.com/file/eyn8YZSdDfVr5oc6Y61Sz5/Blockchain-SK?node-id=0%3A1)
- Smart contract 설계


# 일정

- ~ 11/10 : 설계
- ~ 11/15 : 개발
- ~ 11/16 : 문서정리
- ~ 11/17 : 

# 설계 Draft(https://github.com/ro0opf/blockchain-jdp/blob/dev/blockchain_archi_v1.pptx): 

# 기능 요구사항
- 사전 준비 (화면 필요없을 것으로 보임) - API 는 만드는 것이 편할 것으로 보임
    - Token 생성
    - event 에 token 전송
    - 평가자에 token  전송
- 이벤트 관리
    - 관리자 로그인
    - 평가 이벤트 생성
        - 평가 대상자 정보
        - 평가 기간
        - 평가자 ?( 제한이 필요할까?)
    - 평가종료 (평가기간 이후) → 리워드 자동 계산 및 분배
    - 낙전 처리 ?
- 평가 진행
    - 평가자 로그인
    - 평가자 토큰 조회
    - 평가자 평가 (token을 이벤트 contract 로 전송)
    - 자기 평가 확인
    - 리워드 확인 및 회수
- 평가 대상자 리워드 회수
    - 평가대상자 로그인
    - 평가대상자 토큰 조회
    - 리워드 확인 및 회수

## Smart Contract 설계 

### ERC20 token contract

- [https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20) : ERC20 Interface가 표준이라 거의 수정하지 않고 사용할 예정임
- ERC20 Token 발행
- token 전송
- Interface (표준 API중 사용할 함수)
    - function balanceOf(address _who) public view returns (uint256);
    - function transfer(address _to, uint256 _value) public returns (bool);

### voting contract

- voting event 생성
    - event id
    - target company list (address)
- reward 받기
- voting 수행
    - event id
    - duration
- voting 종료 처리 후 reward 분배
- 낙전 처리?
- 보안관련 처리 필요
    - 연산에 보안적으로 검증된 Library 사용
    - [https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol)
- Interface
    - fuction createEvent(uint32 eventId, address[] targetAddress) public returns (address)
    - fuction startVoting(uint32 eventId, uint duration) public
    - fuction stopVoting(uint32 eventId, uint duration) public
    - function voting(address target, uint32 token) public
    - fuction fundReward(uint256 Reward) public (uint256)
    - fuction withdraw() public returns (uint256)

### Reference

- Remix - ethereum smart contract IDE [https://remix.ethereum.org/](https://remix.ethereum.org/)
- openzeppelin - 보안적으로 검증된 smart-contract example code   [https://github.com/OpenZeppelin/openzeppelin-contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
