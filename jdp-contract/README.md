# Test 절차 및 데이터 (Remix default 계정 사용)

- Prepare
    - Deploy Vote.sol (Remix 에서는 이 파일만 deploy 하면됨)
    - token send to voter - 10 digit은 소수점이라 100000000000 은 10.0000000000 JDP token 이라고 볼수 있음
    ```
        transfer (0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, 100000000000) 
        transfer (0x617F2E2fD72FD9D5503197092aC168c91465E7f2, 100000000000)
        transfer (0x17F6AD8Ef982297579C203069C1DbfFE4348c372, 100000000000)
    ```
- Procedure  (voting 및 withdraw 를 제외한 함수는 signer 를 deploy 한 계정으로 해야함 - remix의 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4)
    - 투표를 위한 Event 생성 - eventId = 0, candidte 2 address
    ```
        createEvent( 0, ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2" ,"0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db"] )
    ```
    - 100 token reward를 위해 주최자가 전송 - eventId = 0, 100 token
    ```
        fundReward (0, 1000000000000)
    ```
    - Vote 시작 - eventId = 0
    ```
        startVoting (0)
    ```
    - Voting - Voting 3명 1번 Voter → A에게 5 token , 2번 voter → A 에게 6 token, 3번 voter → B에게 10 token
    ```
        - signer = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB
            voting (0, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, 50000000000)
        - signer = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2
            voting (0, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, 50000000000)
        - signer = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372
            voting (0, 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 100000000000)
    ```
    - Vote 종료 - eventId = 0
    ```
        stopVoting (0)
    ```
    - Reward 계산 및 출금 가능 설정 - eventId = 0
    ```
        setRefundable (0)
    ```
    - 각자 받은 reward 출금 eventId = 0
    ```
        - signer = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 candidate A
            withdraw(0)
        - signer = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db candidate B
            withdraw(0)
        - signer = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB Voter1
            withdraw(0)
        - signer = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2 Voter2
            withdraw(0)
        - signer = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372 Voter3
            withdraw(0)
     ```
     - 각각의 현재 token 확인 
     ```
        balanceOf (0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)
        balanceOf (0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db)
        balanceOf (0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB)
        balanceOf (0x617F2E2fD72FD9D5503197092aC168c91465E7f2)
        balanceOf (0x17F6AD8Ef982297579C203069C1DbfFE4348c372)
     ```

```jsx 
    10000000000 를 최종값에 곱해야함 
    total_reward = 121 
    candidate
    A = 121 *7/10 * 11/ (11+10) 44.36
    B = 121 *7/10 * 10 / (11 +10) 40.33
    voter
    ㄱ = 121 *3/10 * 7.5 / (7.5 + 9 + 10) = 36.3 / 26.5 * 7.5 = 10.27 + 5 (5 투자 5 남음)
    ㄴ = 121 *3/10 * 9 / (7.5 + 9 + 10)                       = 12.32 + 4 (6 투자 4 남음)
    ㄷ = 121 *3/10 * 10 / (7.5 + 9 + 10)                      = 13.69 + 0 (10투자 0 남음)
```
