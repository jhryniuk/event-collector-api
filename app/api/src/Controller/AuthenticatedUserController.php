<?php

namespace App\Controller;

use App\DTO\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[AsController]
class AuthenticatedUserController extends AbstractController
{
    public function getUserByToken(UserRepository $userRepository, TokenStorageInterface $tokenStorage)
    {
        if ($tokenStorage->getToken()) {
            return new JsonResponse((new User($tokenStorage->getToken()->getUser()))->toArray(), Response::HTTP_OK);
        }

        return new JsonResponse([], Response::HTTP_OK);
    }
}
