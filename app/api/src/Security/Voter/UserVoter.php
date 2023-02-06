<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    private $security = null;

    /**
     * @param Security $security
     */
    public function __construct(Security $security)
    {
        $this->security = $security;
    }
    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, ['USER_READ', 'USER_CREATE', 'USER_EDIT', 'USER_DELETE'])
            && $subject instanceof \App\Entity\User;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
            return false;
        }

        switch ($attribute) {
            case 'USER_READ':
                if ($this->security->isGranted('ROLE_DOCTOR') || $user->getId() == $subject->getId()) {
                    return true;
                }
                break;
            case 'USER_CREATE':
                return true;
            case 'USER_EDIT':
                if ($this->security->isGranted('ROLE_ADMIN') || $user->getId() == $subject->getId()) {
                    return true;
                }
                break;
            case 'USER_DELETE':
                if ($this->security->isGranted('ROLE_ADMIN')) {
                    return true;
                }
                break;
        }

        return false;
    }
}
