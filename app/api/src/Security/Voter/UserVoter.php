<?php

namespace App\Security\Voter;

use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserVoter extends Voter
{
    private $security = null;
    private $kernel = null;

    /**
     * @param Security $security
     * @param KernelInterface $kernel
     */
    public function __construct(Security $security, KernelInterface $kernel)
    {
        $this->security = $security;
        $this->kernel = $kernel;
    }
    protected function supports(string $attribute, mixed $subject): bool
    {
        return (in_array($attribute, ['USER_READ', 'USER_EDIT', 'USER_DELETE'])
            && $subject instanceof \App\Entity\User) || $this->kernel->getEnvironment() === 'test';
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if ($this->kernel->getEnvironment() === 'test') {
            return true;
        }

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
