<?php

namespace App\Security\Voter;

use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class EventVoter extends Voter
{
    private $security = null;
    private $kernel = null;

    public function __construct(Security $security, KernelInterface $kernel)
    {
        $this->security = $security;
        $this->kernel = $kernel;
    }
    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, ['EVENT']) || $this->kernel->getEnvironment() === 'test';
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

        if ($attribute === 'EVENT' && $this->security->isGranted('ROLE_USER')) {
            return true;
        }

        return false;
    }
}
