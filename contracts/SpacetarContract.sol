// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SpacetarContract is AccessControl {

    // Role definitions
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");
    bytes32 public constant BLACKLISTED_ROLE = keccak256("BLACKLISTED_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Events
    event NewSpacetarChat(address indexed from, uint256 timestamp, string chatMessage, string groupName);
    event NewSpaceMessage(address indexed from, uint256 timestamp, string chatMessage);
    event NewComment(uint256 indexed messageId, address indexed user, uint256 timestamp, string commentText);

    event PointsEarned(address indexed user, uint256 points);
    event PointsClaimed(address indexed user, uint256 points);

    // Structs
    struct SpacetarChat {
        address user;
        string chatMessage;
        uint256 timestamp;
        string groupName;
    }

    struct SpaceMessage {
        address user;
        string message;
        uint256 timestamp;
        uint256 commentCount;
    }

    struct Comment {
        address user;
        string commentText;
        uint256 timestamp;
    }

    struct UserInfo {
        address user;
        uint256 messagesSent;
        uint256 pointBalance;
    }

    struct ReportedMessage {
        address reporter;
        uint256 messageId;
        uint256 timestamp;
        string reason;
        bool confirmedSpam;
    }

    // State variables
    SpacetarChat[] spacetarChats;
    SpaceMessage[] spaceMessages;

    // Mappings
    mapping(address => uint256) public userPoints;
    mapping(address => uint256) public bannedUntil;

    mapping(uint256 => mapping(address => bool)) public upvotes;
    mapping(uint256 => mapping(address => bool)) public downvotes;
    mapping(uint256 => ReportedMessage) public reportedMessages;
    mapping(uint256 => Comment[]) public messageComments;

    mapping(uint256 => uint256) public upvoteCounts;
    mapping(uint256 => uint256) public downvoteCounts;

    // Modifier to restrict access to specific roles
    modifier onlyCustomRole(bytes32 role) {
        require(hasRole(role, msg.sender), "Unauthorized");
        _;
    }

    // Contract constructor
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(DEPLOYER_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender); 
    }

    // Function to post message on the Spacetar Group Chat / Help Rooms
    function sendGroupChatMessage(string memory _chatMessage, string memory _groupName) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot send messages.");
        
        spacetarChats.push(SpacetarChat(msg.sender, _chatMessage, block.timestamp, _groupName));
        emit NewSpacetarChat(msg.sender, block.timestamp, _chatMessage, _groupName);

        uint256 messageId = spacetarChats.length - 1; // Use the last index as the message ID
        reportedMessages[messageId].messageId = messageId;

        userPoints[msg.sender] += 10;
        emit PointsEarned(msg.sender, 10);
    }

    // Function to post message on the Spacetar Wall
    function sendSpaceMessage(string memory _message) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot send messages.");
        
        spaceMessages.push(SpaceMessage(msg.sender, _message, block.timestamp, 0)); // Initialize comment count to 0
        emit NewSpaceMessage(msg.sender, block.timestamp, _message);

        uint256 messageId = spaceMessages.length - 1; // Use the last index as the message ID
        reportedMessages[messageId].messageId = messageId;

        userPoints[msg.sender] += 10;
        emit PointsEarned(msg.sender, 10);
    }

    // Function to post comment to Space
    function postComment(uint256 messageId, string memory commentText) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot comment.");
        require(isMessageValid(messageId), "Invalid message ID.");

        messageComments[messageId].push(Comment({
            user: msg.sender,
            commentText: commentText,
            timestamp: block.timestamp
        }));

        userPoints[msg.sender] += 5;
        emit PointsEarned(msg.sender, 5);
        emit NewComment(messageId, msg.sender, block.timestamp, commentText);
    }


    // Function to report a chat message as spam
    function reportSpam(uint256 messageId, string memory reason) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot report messages.");

        require(isMessageValid(messageId), "Invalid message ID.");
        require(!reportedMessages[messageId].confirmedSpam, "Already reported as spam.");

        reportedMessages[messageId] = ReportedMessage({
            reporter: msg.sender,
            messageId: messageId,
            timestamp: block.timestamp,
            reason: reason,
            confirmedSpam: false
        });
    }

    // Function for admins to mark a reported message as spam
    function markAsSpam(uint256 messageId) public onlyRole(ADMIN_ROLE) {
        require(isMessageValid(messageId), "Invalid message ID.");
        require(!reportedMessages[messageId].confirmedSpam, "Already confirmed as spam.");

        reportedMessages[messageId].confirmedSpam = true;

        // Apply a penalty to the sender's point balance
        address messageSender = spacetarChats[messageId].user;
        if (userPoints[messageSender] >= 20) {
            userPoints[messageSender] -= 20;
        } else {
            userPoints[messageSender] = 0;
        }
    }

    // Function to get a list of reported messages
    function getReportedMessages() public view onlyRole(ADMIN_ROLE)returns (ReportedMessage[] memory) {
        uint256 reportedCount = 0;
        // Count the number of reported messages
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (reportedMessages[i].reporter != address(0) && !reportedMessages[i].confirmedSpam) {
                reportedCount++;
            }
        }

        // Create an array to store reported messages
        ReportedMessage[] memory reportedMsgs = new ReportedMessage[](reportedCount);
        uint256 currentIndex = 0;

        // Populate the array with reported messages
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (reportedMessages[i].reporter != address(0) && !reportedMessages[i].confirmedSpam) {
                reportedMsgs[currentIndex] = reportedMessages[i];
                currentIndex++;
            }
        }

        return reportedMsgs;
    }

    // Function to upvote a chat message
    function upvoteMessage(uint256 messageId) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot upvote.");

        require(isMessageValid(messageId), "Invalid message ID.");
        require(!upvotes[messageId][msg.sender], "Already upvoted.");

        upvotes[messageId][msg.sender] = true;
        userPoints[spacetarChats[messageId].user] += 2;
        upvoteCounts[messageId]++;
    }

    // Function to upvote a chat message
    function downvoteMessage(uint256 messageId) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot downvote.");

        require(isMessageValid(messageId), "Invalid message ID.");
        require(!downvotes[messageId][msg.sender], "Already downvoted.");

        downvotes[messageId][msg.sender] = true;
        userPoints[spacetarChats[messageId].user] -= 1;
        downvoteCounts[messageId]++;
    }

    // Function to reverse an upvote
    function reverseUpvote(uint256 messageId) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot upvote");
        require(isMessageValid(messageId), "Invalid message ID.");
        require(upvotes[messageId][msg.sender], "Not upvoted.");

        upvotes[messageId][msg.sender] = false;
        userPoints[spacetarChats[messageId].user] -= 2; // Deduct claimed points
        upvoteCounts[messageId]--;

        emit PointsClaimed(spacetarChats[messageId].user, 2); // Emit an event for transparency
    }

    // Function to reverse a downvote
    function reverseDownvote(uint256 messageId) public {
        require(!hasRole(BLACKLISTED_ROLE, msg.sender), "Blacklisted users cannot downvote.");
        require(isMessageValid(messageId), "Invalid message ID.");
        require(downvotes[messageId][msg.sender], "Not downvoted.");

        downvotes[messageId][msg.sender] = false;
        userPoints[spacetarChats[messageId].user] += 1; // Add back the deducted points
        downvoteCounts[messageId]--;

        emit PointsEarned(spacetarChats[messageId].user, 1); // Emit an event for transparency
    }

    // Function to the the number of upvotes a chat message has
    function getUpvoteCount(uint256 messageId) public view returns (uint256) {
        require(isMessageValid(messageId), "Invalid message ID.");
        return upvoteCounts[messageId];
    }

    // Function to the the number of downvotes a chat message has
    function getDownvoteCount(uint256 messageId) public view returns (uint256) {
        require(isMessageValid(messageId), "Invalid message ID.");
        return downvoteCounts[messageId];
    }

    // Function to slash a percentage of a user's point balance
    function slashUserPoints(address userAddress, uint256 slashRatio) public onlyRole(ADMIN_ROLE) {
        
        require(slashRatio > 0 && slashRatio <= 100, "Invalid slash ratio."); // Ensure the slash ratio is valid

        uint256 currentBalance = userPoints[userAddress];
        uint256 slashAmount = (currentBalance * slashRatio) / 100;

        // Ensure the slashed amount does not exceed the user's balance
        uint256 newBalance = currentBalance >= slashAmount ? currentBalance - slashAmount : 0;
        userPoints[userAddress] = newBalance;

        emit PointsClaimed(userAddress, slashAmount);
    }

    // function to get a userchat from the several Group Chat Rooms that they joined
    function getUserGroupChats(address userAddress) public view returns (SpacetarChat[] memory) {
        uint256 count;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (spacetarChats[i].user == userAddress) {
                count++;
            }
        }
        SpacetarChat[] memory UserChats = new SpacetarChat[](count);
        uint256 currentIndex;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (spacetarChats[i].user == userAddress) {
                UserChats[currentIndex] = spacetarChats[i];
                currentIndex++;
            }
        }
        return UserChats;
    }
    
    // Function to get conversations from each group
    function getGroupChats(string memory groupName) public view returns (SpacetarChat[] memory) {
        uint256 count;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (
                keccak256(bytes(spacetarChats[i].groupName)) == keccak256(bytes(groupName)) &&
                !reportedMessages[i].confirmedSpam
            ) {
                count++;
            }
        }
        
        SpacetarChat[] memory groupChats = new SpacetarChat[](count);
        uint256 currentIndex;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (
                keccak256(bytes(spacetarChats[i].groupName)) == keccak256(bytes(groupName)) &&
                !reportedMessages[i].confirmedSpam
            ) {
                groupChats[currentIndex] = spacetarChats[i];
                currentIndex++;
            }
        }
        
        return groupChats;
    }

    // function to get Messages a user posted to their Space
    function getUserSpaceMessages(address userAddress) public view returns (SpaceMessage[] memory) {
        uint256 count;
        for (uint256 i = 0; i < spaceMessages.length; i++) {
            if (spaceMessages[i].user == userAddress) {
                count++;
            }
        }

        SpaceMessage[] memory userSpaceMessages = new SpaceMessage[](count);
        uint256 currentIndex;
        for (uint256 i = 0; i < spaceMessages.length; i++) {
            if (spaceMessages[i].user == userAddress) {
                userSpaceMessages[currentIndex] = spaceMessages[i];
                currentIndex++;
            }
        }

        return userSpaceMessages;
    }
    
    // function to get All Messages posted to the Space Wall
    function getAllSpaceMessages() public view returns (SpaceMessage[] memory) {
        return spaceMessages;
    }

    // Function to get user stats for a specified number of days
    function getUsers(uint256 filterDays) public view onlyRole(ADMIN_ROLE) returns (UserInfo[] memory) {
        UserInfo[] memory usersInfo = new UserInfo[](spacetarChats.length);
        uint256 currentIndex;

        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (block.timestamp - spacetarChats[i].timestamp <= filterDays * 1 days) {
                address currentUser = spacetarChats[i].user;
                bool userExists = false;

                for (uint256 j = 0; j < currentIndex; j++) {
                    if (usersInfo[j].user == currentUser) {
                        usersInfo[j].messagesSent++;
                        userExists = true;
                        break;
                    }
                }

                if (!userExists) {
                    usersInfo[currentIndex] = UserInfo({
                        user: currentUser,
                        messagesSent: 1,
                        pointBalance: userPoints[currentUser]
                    });
                    currentIndex++;
                }
            }
        }

        UserInfo[] memory filteredUsers = new UserInfo[](currentIndex);
        for (uint256 i = 0; i < currentIndex; i++) {
            filteredUsers[i] = usersInfo[i];
        }

        return filteredUsers;
    }

    // Function to reward a user with a specified number of points
    function rewardUser(address userAddress, uint256 points) public onlyRole(ADMIN_ROLE){
        userPoints[userAddress] += points;
        emit PointsEarned(userAddress, points);
    }

    // Function to get the total point balance of all users
    function getTotalPointBalance() public view onlyRole(ADMIN_ROLE) returns (uint256) {
        uint256 totalBalance = 0;
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            totalBalance += userPoints[spacetarChats[i].user];
        }
        return totalBalance;
    }

    // Function to get the total point balance of all users within a filtered number of days
    function getTotalPointBalanceFiltered(uint256 filterDays) public view onlyRole(ADMIN_ROLE) returns (uint256) {
        uint256 totalBalance = 0;
        uint256 currentTime = block.timestamp;
        
        for (uint256 i = 0; i < spacetarChats.length; i++) {
            if (currentTime - spacetarChats[i].timestamp <= filterDays * 1 days) {
                totalBalance += userPoints[spacetarChats[i].user];
            }
        }
        return totalBalance;
    }

    // Function to check if a message ID is valid
    function isMessageValid(uint256 messageId) internal view returns (bool) {
        return messageId < spacetarChats.length;
    }

    // Function to blacklist a user, granting them the BLACKLISTED_ROLE
    function blacklistUser(address userAddress) public onlyRole(ADMIN_ROLE) {
        grantRole(BLACKLISTED_ROLE, userAddress);
    }
    
    // Function to unblacklist a user, revoking the BLACKLISTED_ROLE
    function unBlacklistUser(address userAddress) public onlyRole(ADMIN_ROLE) {
        revokeRole(BLACKLISTED_ROLE, userAddress);
    }

    // Function to ban a user for 1 day by setting their bannedUntil timestamp
    function banUserFor1day(address userAddress) public onlyRole(ADMIN_ROLE) {
        bannedUntil[userAddress] = block.timestamp + 1 days;
    }

    // Function to GRANT an address ADMIN_ROLE access
    function addAdmin(address adminAddress) public onlyRole(DEPLOYER_ROLE) {
        grantRole(ADMIN_ROLE, adminAddress);
    }   

    // Function to REVOKE an address ADMIN_ROLE access
    function removeAdmin(address adminAddress) public onlyRole(DEPLOYER_ROLE) {    
        grantRole(ADMIN_ROLE, adminAddress);
    }

    /**
     * @dev Grants the deployer role to an address.
     * @param userAddress The address to grant the deployer role.
     */
    function grantDeployerRole(address userAddress) public onlyRole(DEPLOYER_ROLE) {
        grantRole(DEPLOYER_ROLE, userAddress);
    }

    /**
     * @dev Revokes the deployer role from an address.
     * @param userAddress The address to revoke the deployer role.
     */
    function revokeDeployerRole(address userAddress) public onlyRole(DEPLOYER_ROLE) {
        revokeRole(DEPLOYER_ROLE, userAddress);
    }

    /**
     * @dev Checks if an address has the admin role.
     * @param userAddress The address to check.
     * @return A boolean indicating whether the address has the admin role.
     */
    function hasAdminRole(address userAddress) public onlyRole(DEPLOYER_ROLE) view returns (bool) {
        return hasRole(ADMIN_ROLE, userAddress);
    }

    /**
     * @dev Checks if an address has the deployer role.
     * @param userAddress The address to check.
     * @return A boolean indicating whether the address has the deployer role.
     */
    function hasDeployerRole(address userAddress) public onlyRole(DEPLOYER_ROLE) view returns (bool) {
        return hasRole(DEPLOYER_ROLE, userAddress);
    }

    /**
     * @dev Checks if an address has the blacklisted role.
     * @param userAddress The address to check.
     * @return A boolean indicating whether the address has the blacklisted role.
     */
    function hasBlacklistedRole(address userAddress) public onlyRole(ADMIN_ROLE) view returns (bool) {
        return hasRole(BLACKLISTED_ROLE, userAddress);
    }

}
